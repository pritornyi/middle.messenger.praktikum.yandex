enum METHODS {
  GET= 'GET',
  POST= 'POST',
  PUT='PUT',
  DELETE= 'DELETE',
  PATCH = 'PATCH',
}

/**
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
export function queryStringify(data?: Record<string, any>) {
  if (!data) {
    return '';
  }
  let accumulator: string = '';
  Object.entries(data).forEach(([key, value]) => {
    const partial = `${key}=${Array.isArray(value) ? value.join(',') : value}`;
    accumulator = [accumulator, partial].join('&');
  });
  return `?${accumulator}`;
}

export type Options = {
    method: METHODS,
    headers?: Record<string, string>,
    data?: any,
    timeout?: number,
    retries?: number,
}

export default class HTTPClient {
  protected endpoint: string;

  static API_URL = 'https://ya-praktikum.tech/api/v2';

  constructor(endpoint: string) {
    this.endpoint = `${HTTPClient.API_URL}${endpoint}`;
  }

  public get = <Response>(url: string, options?: Omit<Options, 'method'>):
      Promise<Response> => this._request<Response>(
        `${this.endpoint}${url}${queryStringify(options?.data)}`,
        { ...options, method: METHODS.GET },
      );

  public put = <Response>(url:string, options?: Omit<Options, 'method'>):
      Promise<Response> => this._request<Response>(
        this.endpoint + url,
        { ...options, method: METHODS.PUT },
      );

  public post = <Response = void>(url:string, options?: Omit<Options, 'method'>):
      Promise<Response> => this._request<Response>(
        this.endpoint + url,
        { ...options, method: METHODS.POST },
      );

  public delete = <Response>(url:string, options?: Omit<Options, 'method'>):
      Promise<Response> => this._request<Response>(
        this.endpoint + url,
        { ...options, method: METHODS.DELETE },
      );

  public patch = <Response = void>(path: string, options?: Omit<Options, 'method'>):
      Promise<Response> => this._request<Response>(
        this.endpoint + path,
        {
          ...options,
          method: METHODS.PATCH,
        },
      );

  private _request = <Response>(url: string, options: Options = {
    method: METHODS.GET,
  }): Promise<Response> => {
    const {
      headers = { 'Content-Type': 'application/json' }, data, method, timeout,
    } = options;

    return new Promise((resolve, reject: (reason?: Error | string) => void) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      setTimeout(() => {
        reject(new Error('timeout'));
      }, timeout ?? 5000);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response.reason);
          }
        }
      };

      xhr.onabort = () => reject(new Error('abort'));
      xhr.onerror = () => reject(new Error('error'));
      xhr.ontimeout = () => reject(new Error('timeout'));

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {

      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
