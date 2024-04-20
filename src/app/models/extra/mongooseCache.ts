import { Redis } from 'ioredis';
import mongoose from 'mongoose';
import serverConfig from '../../../configs/serverConfig';
import ICacheOptions from '../../../interfaces/ImongooseCacheOptions';

const client = new Redis();

declare module 'mongoose' {
  interface Query<any> {
      cache(options: ICacheOptions): Query<any>;
      useCache: boolean;
      hashKey: string;
      mongooseCollection: {
        name: string;
      }
  }
}

mongoose.Query.prototype.cache = function cache(options: ICacheOptions) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');

  return this;
};

const originalExec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function exec() {
  if (!this.useCache) {
    return originalExec.apply(this, arguments);
  }

  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name
  });

  const cacheValue = await client.get(key);

  if (cacheValue) {
    return JSON.parse(cacheValue);
  }

  const result = await originalExec.apply(this, arguments);

  client.set(key, JSON.stringify(result), 'EX', Number(serverConfig.CACHE_EXPIRATION_TIME));

  return result;
};