import http from 'http';
import 'dotenv/config';
import { Service } from "@modules/service";
import { router } from "@instances";

const PORT = process.env.PORT;

const server = http.createServer();
const service = new Service(router, server);

service.start(PORT);



