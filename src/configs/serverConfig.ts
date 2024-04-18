import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  SERVER_PORT: Number(process.env.SERVER_PORT),
  DATABASE_URI: process.env.DATABASE_URI,
  MARVEL_TS: process.env.MARVEL_TS,
  MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
  MARVEL_HASH: process.env.MARVEL_HASH,
  MARVEL_API_AUTH: `?ts=${process.env.MARVEL_TS}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${process.env.MARVEL_HASH}`,
  IMAGE_QUALITY: process.env.IMAGE_QUALITY,
  IMAGE_EXTENSION: process.env.IMAGE_EXTENSION
};

export default serverConfig;