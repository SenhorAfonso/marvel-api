import IORM from './interfaces/ORM';

class Database {
  private URI: string;
  private ORM: IORM;

  constructor(ORM: IORM, URI: string) {
    this.ORM = ORM;
    this.URI = URI;
  }

  async connect() {
    try {
      await this.ORM.connect(this.URI);
      console.log('Database connected');
    } catch (error) {
      throw new Error('Can not connect to database!');
    }
  }
}

export default Database;