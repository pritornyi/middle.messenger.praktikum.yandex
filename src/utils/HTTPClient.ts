enum METHODS {
  GET= 'GET',
  POST= 'POST',
  PUT='PUT',
  DELETE= 'DELETE',
}

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
export function queryStringify(data: Record<string, any>) {
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
  get = (url: string, options?: Options) => this._request(
    `${url}${queryStringify(options?.data)}`,
    { ...options, method: METHODS.GET },
  );

  put = (url:string, options?: Options) => this._request(
    url,
    { ...options, method: METHODS.PUT },
  );

  post = (url:string, options?: Options) => this._request(
    url,
    { ...options, method: METHODS.POST },
  );

  delete = (url:string, options?: Options) => this._request(
    url,
    { ...options, method: METHODS.DELETE },
  );

  private _request = (url:string, options: Options = {
    method: METHODS.GET,
    headers: { 'Content-Type': 'text/plain' },
  }) => {
    const {
      headers, data, method, timeout,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      setTimeout(() => {
        reject();
      }, timeout ?? 5000);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (!data || method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}