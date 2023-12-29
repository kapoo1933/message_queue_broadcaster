import type { IHandler } from "@interfaces";
import type { THandlerFunction } from "@types";

class Handler implements IHandler {
  method: string;
  path: string;
  handler: THandlerFunction;

  constructor(method: string, path: string, handler: THandlerFunction, payload: string[] = []) {
    this.method = method;
    this.path = path;
    this.handler = handler;
  }
}

export { Handler };