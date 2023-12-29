import http from 'http';
import { HttpMethod, HttpStatusCode } from "@enums";
import type { IHandler, IRouter } from "@interfaces";
import type { THandlerFunction } from '@types';
import { url_parser } from '@utilities';
import { HttpResponseHandler } from '../http_response_handler';

class Router implements IRouter {
  #handler_list: IHandler[] = [];
  constructor(handler_list: IHandler[]) {
    this.#handler_list = handler_list;
  }
  #find_handler = (method: HttpMethod, path: string): THandlerFunction | null => {
    for (const handler of this.#handler_list) {
      if (handler.method === method && handler.path === path) {
        return handler.handler;
      }
    }
    return null;
  }

  #method_type_guard = (method: string): method is HttpMethod => {
    return method in HttpMethod;
  }

  #extract_payload = (request: http.IncomingMessage) => {
    let body: Buffer[] = [];
    return new Promise<string>((resolve, reject) => {
      request.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        resolve(Buffer.concat(body).toString());
      });
    });
  }

  async start_routing(request: http.IncomingMessage, response: http.ServerResponse) {
    let { headers, url = '', method = HttpMethod.GET } = request;
    let payload: string[] = [];
    const { host = '' } = headers;
    const { path } = url_parser(host, url);
    let execution_handler: THandlerFunction | null = null;
    if (this.#method_type_guard(method)) execution_handler = this.#find_handler(method, path);
    if (method === HttpMethod.POST)
      payload.push(await this.#extract_payload(request));
    if (execution_handler) execution_handler(payload, response);
    else {
      const res = new HttpResponseHandler(HttpStatusCode.BAD_REQUEST, response, { 'Content-Type': 'application/json' });
      res.respond();
    }
  }

  get handlers(): IHandler[] {
    return this.#handler_list;
  }
}

export { Router };