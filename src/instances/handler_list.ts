import type { IHttpResponseHandler, ISubscriber } from "@interfaces";
import { Handler, Subscriber, HttpResponseHandler } from "@modules";
import { HttpMethod, HttpStatusCode } from "@enums";
import { subscriber_list } from "./subscriber_list";

const handler_list: Handler[] = [
  new Handler(HttpMethod.GET, '/subscriber_list', (payload, response) => {
    console.log('GET /');
    let subscribers: ISubscriber[] = [] satisfies { [key: string]: string }[];
    let res: IHttpResponseHandler;
    if (subscriber_list.length > 0) {
      subscribers = subscriber_list.map(subscriber => ({ id: subscriber.id, host: subscriber.host, path: subscriber.path, area: subscriber.area }));
      res = new HttpResponseHandler(HttpStatusCode.OK, response, { 'Content-Type': 'application/json' });
    }
    else {
      res = new HttpResponseHandler(HttpStatusCode.BAD_REQUEST, response, { 'Content-Type': 'application/json' });
    }
    res.respond(JSON.stringify(subscribers))
  }),

  new Handler(HttpMethod.POST, '/subscribe', (payload, response) => {
    console.log('POST /subscribe');
    let res: IHttpResponseHandler;
    if (payload.length > 0) {
      const { id, host, path, area } = JSON.parse(payload[0]);
      const subscriber = new Subscriber(id, host, path, area);
      subscriber_list.push(subscriber);
      res = new HttpResponseHandler(HttpStatusCode.OK, response, { 'Content-Type': 'application/json' });
      res.respond();
    }
    else {
      res = new HttpResponseHandler(HttpStatusCode.BAD_REQUEST, response);
      res.respond();
    }
  })
];

export { handler_list };