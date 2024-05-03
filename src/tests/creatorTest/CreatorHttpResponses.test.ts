/* eslint-disable */
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import server from '../../server';
import creatorSchema from '../../app/models/creatorModel';
import client from '../../app/models/extra/mongooseCache';
import serverConfig from '../../configs/serverConfig';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

const LONG_RUNNING_TEST: number = 15000;

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

describe('Check for Creator Entity\'s routes', () => {

  describe('Fetch Route Should', () => {
    it('be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .get('/api/v1/fetch-creators')
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('Creators successfully fetched from API!');
      expect(response.body.data.available).toBe(84);
    }, LONG_RUNNING_TEST);

  })

  describe('Get All Route should', () => {
    it('Get all route should be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      await request(server)
        .get('/api/v1/fetch-creators')
        .auth(token, { type: 'bearer' });
  
      const response = await request(server)
        .get('/api/v1/creators')
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('All creators were retrieved!');
      expect(response.body.data.available).toBe(3);
    }, LONG_RUNNING_TEST);
  
    it('Get all route should return 404 when there is no creator registered', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .get('/api/v1/creators')
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(404);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('There is no creatores registered!');
    }, LONG_RUNNING_TEST);
  })

  describe('Get Single Route should', () => {
    it('return 400 error when the id format is invalid', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .get('/api/v1/creator/invalid')
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('Id format is invalid');
    });
  
    it('return 500 error when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .get('/api/v1/creator/66329e3161d5caedd247e116')
        .auth(token, { type: 'bearer' });
  
      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(500);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });
  
    it('return 404 error when the id is not associated with an record', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .get('/api/v1/creator/66329e3161d5caedd247e116')
        .auth(token, { type: 'bearer' });
  
      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(404);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('There is no creator with such id');
    });
  })

  describe('Add Creator Route should', () => {
    it('be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
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
        .send(newCreator)
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('New creator added!');
    }, LONG_RUNNING_TEST);
  
    it('return 500 when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
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
        .send(newCreator)
        .auth(token, { type: 'bearer' });
  
      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(500);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toBe('An unknown error occured. Please try again later');
    }, LONG_RUNNING_TEST);
  })

  describe('Get Single Creator Route should', () => {
    it('Get Single Creator route should be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
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
        .send(newCreator)
        .auth(token, { type: 'bearer' });
  
      const creatorID = creatorResponse.body.data.result._id;
  
      const response = await request(server)
        .get(`/api/v1/creator/${creatorID}`)
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('Single creator retrieved!');
      expect(response.body.data.result._id).toBe(`${creatorID}`);
    }, LONG_RUNNING_TEST);
  })

  describe('Update Creator Route should', () => {
    it('be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
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
        .send(newCreator)
        .auth(token, { type: 'bearer' });
  
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
        .send(newCreatorInfo)
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('The creator were updated!');
      expect(response.body.data.result.sagaComic).toBe('python');
    }, LONG_RUNNING_TEST);
  
    it('return 400 error when the id format is invalid', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
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
        .put('/api/v1/creator/invalid')
        .send(newCreator)
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('Id format is invalid');
    });
  
    it('return 404 error when the id is not associated to an record', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
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
        .put('/api/v1/creator/66329e3161d5caedd247e111')
        .send(newCreator)
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(404);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('The id 66329e3161d5caedd247e111 is not associated with an record');
    });
  
    it('return 500 error when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
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
        .put('/api/v1/creator/66329e3161d5caedd247e116')
        .send(newCreator)
        .auth(token, { type: 'bearer' });
  
      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(500);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });
  })

  describe('Delete Creator Route should', () => {
    it('return 400 error when the id format is invalid', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .delete('/api/v1/creator/invalid')
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('Id format is invalid');
    });
  
    it('return 404 error when the id is not associated to an record', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .delete('/api/v1/creator/66329e3161d5caedd247e111')
        .auth(token, { type: 'bearer' });
  
      console.log(response.body)
  
      expect(response.body.code).toBe(404);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('The id 66329e3161d5caedd247e111 is not associated with an record');
    });
  
    it('return 500 error when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .delete('/api/v1/creator/66329e3161d5caedd247e116')
        .auth(token, { type: 'bearer' });
  
      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(500);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });
  })

  describe('Delete Single Creator route should', () => {
    it('be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
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
        .send(newCreator)
        .auth(token, { type: 'bearer' });
  
      const creatorID = creatorResponse.body.data.result._id;
  
      const response = await request(server)
        .delete(`/api/v1/creator/${creatorID}`)
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('Creator deleted');
      expect(response.body.data.result._id).toBe(`${creatorID}`);
    }, LONG_RUNNING_TEST);
  })

  describe('Reset Creators Route should', () => {
    it('be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .get('/api/v1/reset-creators')
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('The creators were reseted!');
      expect(response.body.data.available).toBe(84);
    }, LONG_RUNNING_TEST);

    it('return 500 error when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .get('/api/v1/reset-creators')
        .auth(token, { type: 'bearer' });
  
      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(500);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });
  })

  describe('Extra Routes', () => {
    it('Get by Collection Size route should return 500 error when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .get('/api/v1/creators/collectionSize')
        .query({ collSize: 2500 })
        .auth(token, { type: 'bearer' });
  
      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(500);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });
  
    it('Get by Collection Size route should return 404 error when the query have no result', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .get('/api/v1/creators/collectionSize')
        .query({ collSize: LONG_RUNNING_TEST })
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(404);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('The resource searched was not found!');
    });
  
    it('Get by Collection Size route should return 500 when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .get('/api/v1/creators/nameLength')
        .query({ nameLength: 10 })
        .auth(token, { type: 'bearer' });
  
      await mongoose.connect(mongoURI)
      expect(response.body.code).toBe(500);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });
  
    it('Get by Collection Size route should return 404 error when the query have no result', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const response = await request(server)
        .get('/api/v1/creators/nameLength')
        .query({ nameLength: 100 })
        .auth(token, { type: 'bearer' });
  
      expect(response.body.code).toBe(404);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('The resource searched was not found!');
    });
  })

  describe('The cache should', () => {
    it('Have a faster response time', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;
  
      const responseWithNoCache = await request(server)
        .get('/api/v1/fetch-creators')
        .auth(token, { type: 'bearer' })
  
      const responseTimeWithNoCache: number = Number(responseWithNoCache.headers['x-response-time']);
  
      const responseWithCache = await request(server)
        .get('/api/v1/fetch-creators')
        .auth(token, { type: 'bearer' })
      
      const responseTimeWithCache: number =  Number(responseWithCache.headers['x-response-time']);
  
      expect(responseTimeWithNoCache).toBeGreaterThan(responseTimeWithCache)
    })
  })

});