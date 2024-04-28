import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import server from '../../server';
import creatorSchema from '../../app/models/creatorModel';
import client from '../../app/models/extra/mongooseCache';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

describe('Check for Creator Entity\'s routes', () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoURI = mongoServer.getUri();
    await mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    client.flushall();
    await creatorSchema.deleteMany({});
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.close();
    await client.quit();
  });

  it('Fetch route should be working', async () => {
    const response = await request(server)
      .get('/api/v1/fetch-creators');

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Creators successfully fetched from API!');
    expect(response.body.data.available).toBe(84);
  }, 10000);

  it('Get all route should be working', async () => {
    await request(server).get('/api/v1/fetch-creators');
    const response = await request(server)
      .get('/api/v1/creators');

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('All creators were retrieved!');
    expect(response.body.data.available).toBe(3);
  }, 15000);

  it('Add Creator route should be working', async () => {
    const newCreator = {
      name: 'Cretor Teste',
      role: 'Tester',
      sagaComic: 'nodejs',
      otherComics: [
        'jest',
        'mocha',
        'chai'
      ]
    };

    const response = await request(server)
      .post('/api/v1/creator')
      .send(newCreator);

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('New creator added!');
  }, 15000);

  it('Get Single Creator route should be working', async () => {
    const newCreator = {
      name: 'Cretor Teste',
      role: 'Tester',
      sagaComic: 'nodejs',
      otherComics: [
        'jest',
        'mocha',
        'chai'
      ]
    };

    const creatorResponse = await request(server)
      .post('/api/v1/creator')
      .send(newCreator);

    const creatorID = creatorResponse.body.data.result._id;

    const response = await request(server)
      .get(`/api/v1/creator/${creatorID}`);

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Single creator retrieved!');
    expect(response.body.data.result._id).toBe(`${creatorID}`);
  }, 15000);

  it('Update creator info route should be working', async () => {
    const newCreator = {
      name: 'Cretor Teste',
      role: 'Tester',
      sagaComic: 'nodejs',
      otherComics: [
        'jest',
        'mocha',
        'chai'
      ]
    };

    const creatorResponse = await request(server)
      .post('/api/v1/creator')
      .send(newCreator);

    const creatorID = creatorResponse.body.data.result._id;

    const newCreatorInfo = {
      name: 'Cretor Teste',
      role: 'Tester',
      sagaComic: 'python',
      otherComics: [
        'pytest',
        'pyUnit',
        'behave'
      ]
    };

    const response = await request(server)
      .put(`/api/v1/creator/${creatorID}`)
      .send(newCreatorInfo);

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('The creator were updated!');
    expect(response.body.data.result.sagaComic).toBe('python');
  }, 15000);

  it('Delete Single Creator route should be working', async () => {
    const newCreator = {
      name: 'Cretor Teste',
      role: 'Tester',
      sagaComic: 'nodejs',
      otherComics: [
        'jest',
        'mocha',
        'chai'
      ]
    };

    const creatorResponse = await request(server)
      .post('/api/v1/creator')
      .send(newCreator);

    const creatorID = creatorResponse.body.data.result._id;

    const response = await request(server)
      .delete(`/api/v1/creator/${creatorID}`);

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Creator deleted');
    expect(response.body.data.result._id).toBe(`${creatorID}`);
  }, 15000);

  it('Reset Creator route should be working', async () => {
    const response = await request(server)
      .get('/api/v1/reset-creators');

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('The creators were reseted!');
    expect(response.body.data.available).toBe(84);
  }, 15000);

});