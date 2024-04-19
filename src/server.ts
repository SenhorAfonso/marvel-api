import express from 'express';
import comicRouter from './routes/comic_route';
import creatorRouter from './routes/creators_flow';

class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/api/v1/', comicRouter);
    this.server.use('/api/v1/', creatorRouter);
  }

}

export default new Server().server;