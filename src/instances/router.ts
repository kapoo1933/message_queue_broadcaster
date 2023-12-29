import { Router } from '@modules'
import { handler_list } from './handler_list';
import type { IRouter } from '@interfaces';

const router: IRouter = new Router(handler_list);

export { router };