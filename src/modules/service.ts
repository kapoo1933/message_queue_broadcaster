import http from "http";
import type { IService, IRouter } from "@interfaces";

class Service implements IService {
  #server: http.Server;
  #router: IRouter;

  constructor(router: IRouter, server: http.Server) {
    this.#router = router;
    this.#server = server;
  }

  start(port: string | number) {
    this.#server.on('request', (request, response) => {
      this.#router.start_routing(request, response);
    });
    this.#server.listen(port);
    console.log(`Server listening on port ${port}`);
  }
}

export { Service };