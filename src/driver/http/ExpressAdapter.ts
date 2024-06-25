import express, { Express, Request, Response, Router } from 'express';

import HttpServer from "../../application/contracts/HttpServer";

export default class ExpressAdapter implements HttpServer {
  app: Express;
  router: Router;

  constructor () {
    this.app = express();
    this.router = express.Router();

    this.app.use(express.json());
  }

  listen(port: number | string): void {
    this.app.listen(port, () => {
      	console.log(`Server listening on PORT: ${port}`);
    });
  }

  route(method: 'get' | 'post', path: string, callback: Function): any {
    return this.app[method](path, async (request: Request, response: Response) => {
      try {
        const body = request.body;
        const params = request.params;
        const callbackFunction = await callback(body, params);

        return response.json(callbackFunction);
      } catch (error: any) {
        response.status(400).json({
          message: error.message
        })
      }
    })
  }
}