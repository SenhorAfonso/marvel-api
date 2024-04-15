import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  SERVER_PORT: Number(process.env.SERVER_PORT)
};

export default serverConfig;