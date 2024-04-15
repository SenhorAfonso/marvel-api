import server from './server';
import serverConfig from './configs/serverConfig';

class App {
  private port: number = Number(serverConfig.SERVER_PORT);

  constructor() {
    this.start();
  }

  start() {
    server.listen(this.port, () => {
      console.log(`Server is listening at ${this.port} port`);
    });
  }
}

new App();