import http from 'http';
import { THandlerFunction } from '../types';

interface IHandler {
  method: string;
  path: string;
  handler: THandlerFunction;
}

interface ISubscriber {
  id: string;
  host: string;
  path: string;
  area: string;
}

interface IRouter {
  handlers: IHandler[];
  start_routing(request: http.IncomingMessage, response: http.ServerResponse): void;
}

interface IService {
  start(port: string): void;
}

interface IHttpResponseHandler {
  respond(message?: string): void;
}

export { IService, IRouter, IHandler, ISubscriber, IHttpResponseHandler };