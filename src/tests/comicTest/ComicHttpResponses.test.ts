import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import server from '../../server';
import comicsModel from '../../app/models/comicsModel';
import client from '../../app/models/extra/mongooseCache';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

describe('Check for Comic Entity\'s routes', () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoURI = mongoServer.getUri();
    await mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    client.flushall();
    await comicsModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.close();
    await client.quit();
  });

  it('Fetch route should be working', async () => {
    const response = await request(server)
      .get('/api/v1/fetch-comics');

    expect(response.body.code).toBe(StatusCodes.CREATED);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Comics successfully fetched from API!');
    expect(response.body.data.available).toBe(20);
  }, 10000);

  it('Get all route should be working', async () => {
    await request(server).get('/api/v1/fetch-comics');
    const response = await request(server)
      .get('/api/v1/comics');

    expect(response.body.code).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('All comics were retrieved!');
    expect(response.body.data.available).toBe(3);
  }, 15000);

  it('Add Comic route should be working', async () => {
    const newComic = {
      title: 'How to make good tests with jest',
      description: 'A comic about tests',
      publishDate: '27/05/2009',
      folder: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
    };

    const response = await request(server)
      .post('/api/v1/comic')
      .send(newComic);

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('New Comic added!');
  }, 15000);

  it('Get Single Comic route should be working', async () => {
    const newComic = {
      title: 'How to make good tests with jest',
      description: 'A comic about tests',
      publishDate: '27/05/2009',
      folder: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
    };

    const ComicResponse = await request(server)
      .post('/api/v1/comic')
      .send(newComic);

    const ComicID = ComicResponse.body.data.result._id;

    const response = await request(server)
      .get(`/api/v1/comic/${ComicID}`);

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Single comic retrieved!');
    expect(response.body.data.result._id).toBe(`${ComicID}`);
  }, 15000);

  it('Update Comic info route should be working', async () => {
    const newComic = {
      title: 'How to make good tests',
      description: 'A comic about tests',
      publishDate: '27/05/2009',
      folder: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
    };

    const ComicResponse = await request(server)
      .post('/api/v1/comic')
      .send(newComic);

    const ComicID = ComicResponse.body.data.result._id;

    const newComicInfo = {
      title: 'How to make good tests with pytest',
      description: 'Another comic about tests, but with python',
      publishDate: '20/02/1991',
      folder: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAfbG2qFSS5c9d7PKn3OjRC6CE6vJzlwyyI5vl75GN2g&s'
    };

    const response = await request(server)
      .put(`/api/v1/comic/${ComicID}`)
      .send(newComicInfo);

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('The Comic were updated!');
    expect(response.body.data.result.title).toBe('How to make good tests with pytest');
  }, 15000);

  it('Delete Single Comic route should be working', async () => {
    const newComic = {
      name: 'Cretor Teste',
      role: 'Tester',
      sagaComic: 'nodejs',
      otherComics: [
        'jest',
        'mocha',
        'chai'
      ]
    };

    const ComicResponse = await request(server)
      .post('/api/v1/comic')
      .send(newComic);

    const ComicID = ComicResponse.body.data.result._id;

    const response = await request(server)
      .delete(`/api/v1/comic/${ComicID}`);

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Comic successfully deleted!');
    expect(response.body.data.result._id).toBe(`${ComicID}`);
  }, 15000);

  it('Reset Comic route should be working', async () => {
    const response = await request(server)
      .get('/api/v1/reset-comics');

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Comics successfully reseted!');
    expect(response.body.data.available).toBe(20);
  }, 15000);

});