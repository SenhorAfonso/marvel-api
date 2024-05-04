import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  SERVER_PORT: Number(process.env.SERVER_PORT),
  DATABASE_URI: process.env.DATABASE_URI,
  MARVEL_API_AUTH: `?ts=${process.env.MARVEL_TS}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${process.env.MARVEL_HASH}`,
  IMAGE_QUALITY: process.env.IMAGE_QUALITY,
  IMAGE_EXTENSION: process.env.IMAGE_EXTENSION,
  CACHE_EXPIRATION_TIME: process.env.CACHE_EXPIRATION_TIME,
  JWT_SECRET: process.env.JWT_SECRET,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  USER_TOKEN_TEST: process.env.USER_TOKEN_TEST
};

export default serverConfig;