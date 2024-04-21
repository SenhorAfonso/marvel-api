import mongoose from 'mongoose';
import os from 'node:os';
import cluster from 'node:cluster';
import server from './server';
import Database from './infra/database/connectDB';
import serverConfig from './configs/serverConfig';
import './app/models/extra/mongooseCache';

class App {
  private port: number = serverConfig.SERVER_PORT;

  constructor() {
    if (cluster.isPrimary) {
      this.runPrimaryProcess();
    } else {
      this.runWorkerProcess();
    }
  }

  async start() {
    await new Database(mongoose, serverConfig.DATABASE_URI!).connect();
    server.listen(this.port);
  }

  runPrimaryProcess() {
    os.cpus().forEach(() => {
      cluster.fork();
    });

    cluster.on('exit', (worker, code) => {
      if (code !== 0 && !worker.exitedAfterDisconnect) {
        cluster.fork();
      }
    });

    console.log('Database connected');
    console.log(`Server is listening at ${this.port} port`);
  };

  async runWorkerProcess() {
    await this.start();
  };

}

new App();