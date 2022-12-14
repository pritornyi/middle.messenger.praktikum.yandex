import HTTPClient from '../utils/HTTPClient';

export default abstract class BaseAPI {
  protected http: HTTPClient;

  protected constructor(endpoint: string) {
    this.http = new HTTPClient(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier: string | number): Promise<unknown>;

  public abstract update?(identifier: string | number, data: unknown): Promise<unknown>;

  public abstract delete?(identifier: unknown): Promise<unknown>;
}
