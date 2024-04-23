import { Redis } from 'ioredis';
import mongoose from 'mongoose';
import serverConfig from '../../../configs/serverConfig';
import ICacheOptions from '../../../interfaces/ImongooseCacheOptions';

const client = new Redis();

declare module 'mongoose' {
  interface Query<ResultType, DocType, THelpers, RawDocType, QueryOp> {
    cache(options: ICacheOptions): Query<ResultType, DocType, THelpers, RawDocType, QueryOp>;
    useCache: boolean;
    hashCache: ICacheOptions;
    mongooseCollection: {
      name: string;
    }
  }
}

mongoose.Query.prototype.cache = function cache(options: ICacheOptions) {
  this.useCache = true;
  this.hashCache = options;

  return this;
};

const originalExec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function exec() {
  if (!this.useCache) {
    return originalExec.apply(this);
  }

  const key = JSON.stringify({
    ...this.getQuery(),
    method: this.hashCache.method,
    collection: this.mongooseCollection.name
  });

  const cacheValue = await client.get(key);

  if (cacheValue) {
    return JSON.parse(cacheValue);
  }

  const result = await originalExec.apply(this);

  client.set(key, JSON.stringify(result), 'EX', Number(serverConfig.CACHE_EXPIRATION_TIME));

  return result;
};

export default client;