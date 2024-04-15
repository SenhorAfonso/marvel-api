import express from 'express';

class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
  }

}

export default new Server().server;