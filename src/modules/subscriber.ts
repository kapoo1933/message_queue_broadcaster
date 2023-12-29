import type { ISubscriber } from '@interfaces'

class Subscriber implements ISubscriber {
  #id: string;
  #host: string;
  #path: string;
  #area: string;

  constructor(id: string, host: string, path: string, area: string) {
    this.#id = id;
    this.#host = host;
    this.#path = path;
    this.#area = area;
  }

  get id() {
    return this.#id;
  }

  get host() {
    return this.#host;
  }

  get path() {
    return this.#path;
  }

  get area() {
    return this.#area;
  }
}

export { Subscriber }