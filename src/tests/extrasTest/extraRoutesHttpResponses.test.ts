/* eslint-disable */

import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import server from '../../server';
import client from '../../app/models/extra/mongooseCache';
import comicsModel from '../../app/models/comicsModel';
import { StatusCodes } from 'http-status-codes';
import charactersModel from '../../app/models/charactersModel';
import creatorModel from '../../app/models/creatorModel';
import serverConfig from '../../configs/serverConfig';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

const LONG_RUNNING_TEST: number = 35000;

describe('Check for Creator Entity\'s routes', () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoURI = mongoServer.getUri();
    await mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    client.flushall();
    await comicsModel.deleteMany({});
    await charactersModel.deleteMany({});
    await creatorModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.close();
    await client.quit();
  });

  it('getByCollectionSize route should be working', async () => {
    const token: string = serverConfig.USER_TOKEN_TEST!;
    await request(server)
      .get('/api/v1/fetch-creators')
      .auth(token, { type: 'bearer' });

    const response = await request(server)
      .get('/api/v1/creators/collectionSize')
      .query({ collSize: 2500 })
      .auth(token, { type: 'bearer' });

    expect(response.body.code).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Creators with collection greater than 2500 comics were retrieved!');
    expect(response.body.data.available).toBe(4);
  }, LONG_RUNNING_TEST);

  it('getByNameLength route should be working', async () => {
    const token: string = serverConfig.USER_TOKEN_TEST!;

    await request(server)
      .get('/api/v1/fetch-creators')
      .auth(token, { type: 'bearer' });

    const response = await request(server)
      .get('/api/v1/creators/nameLength')
      .query({ nameLength: 10 })
      .auth(token, { type: 'bearer' });

    expect(response.body.code).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Creators with name length greater than 10 characters were retrieved!');
    expect(response.body.data.available).toBe(52);
  }, LONG_RUNNING_TEST);

  it('getByPageCount route should be working', async () => {
    const token: string = serverConfig.USER_TOKEN_TEST!;

    await request(server)
      .get('/api/v1/fetch-comics')
      .auth(token, { type: 'bearer' });

    const response = await request(server)
      .get('/api/v1/comics/pageCount')
      .query({ numPages: 30 })
      .auth(token, { type: 'bearer' });

    expect(response.body.code).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Comics with number of pages greater than 30 were retrieved!');
    expect(response.body.data.available).toBe(20);
  }, LONG_RUNNING_TEST);

  it.skip('getByComicCount route should be working', async () => {
    const token: string = serverConfig.USER_TOKEN_TEST!;

    await request(server)
      .get('/api/v1/fetch-characters')
      .auth(token, { type: 'bearer' });

    const response = await request(server)
      .get('/api/v1/character/comicCount')
      .query({ comicCount: 30 })
      .auth(token, { type: 'bearer' });

    console.log(response.body)
    expect(response.body.code).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Comics with number of pages greater than 30 were retrieved!');
    expect(response.body.data.available).toBe(20);
  }, LONG_RUNNING_TEST);

  it.skip('getBysecondTitle route should be working', async () => {
    const token: string = serverConfig.USER_TOKEN_TEST!;

    await request(server)
      .get('/api/v1/fetch-characters')
      .auth(token, { type: 'bearer' });

    const response = await request(server)
      .get('/api/v1/character/secondTitle')
      .auth(token, { type: 'bearer' });

    expect(response.body.code).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Comics with number of pages greater than 30 were retrieved!');
    expect(response.body.data.available).toBe(20);
  }, LONG_RUNNING_TEST);

});