import queue from 'express-queue';
import express from 'express';
import compression from 'compression';
import comicRouter from './routes/comicRoute';
import creatorRouter from './routes/creatorsRoute';
import characterRouter from './routes/character_route';
import ErrorhandlingMiddleware from './app/middlewares/errorHandlingMiddleware';

class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(compression({ threshold: 0 }));
    this.server.use(queue({ activeLimit: 12, queuedLimit: 50 }));
    this.server.use('/api/v1/', comicRouter);
    this.server.use('/api/v1/', creatorRouter);
    this.server.use('/api/v1/', characterRouter);
    this.server.use(ErrorhandlingMiddleware.ErrorHandler);
  }
}

export default new Server().server;
