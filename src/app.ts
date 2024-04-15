import mongoose from 'mongoose';
import server from './server';
import Database from './infra/database/connectDB';
import serverConfig from './configs/serverConfig';

class App {
  private port: number = serverConfig.SERVER_PORT;

  constructor() {
    this.start();
  }

  async start() {
    await new Database(mongoose, serverConfig.DATABASE_URI!).connect();
    server.listen(this.port, () => {
      console.log(`Server is listening at ${this.port} port`);
    });
  }
}

new App();