import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import server from '../../server';
import comicsModel from '../../app/models/comicsModel';
import client from '../../app/models/extra/mongooseCache';
import serverConfig from '../../configs/serverConfig';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

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

describe('Check for Comic Entity\'s routes', () => {

  describe('Fetch Comics route should', () => {
    it('be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .get('/api/v1/fetch-comics')
        .auth(token, { type: 'bearer' });

      expect(response.body.code).toBe(StatusCodes.CREATED);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('Comics successfully fetched from API!');
      expect(response.body.data.available).toBe(20);
    }, 10000);

    it('return 500 error when database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .get('/api/v1/fetch-comics')
        .auth(token, { type: 'bearer' });

      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    }, 10000);
  });

  describe('Get All Comics route should', () => {
    it('be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      await request(server)
        .get('/api/v1/fetch-comics')
        .auth(token, { type: 'bearer' });

      const response = await request(server)
        .get('/api/v1/comics')
        .auth(token, { type: 'bearer' });

      expect(response.body.code).toBe(StatusCodes.OK);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('All comics were retrieved!');
      expect(response.body.data.available).toBe(3);
    }, 15000);

    it('return 404 error when there is no comic registered', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .get('/api/v1/comics')
        .auth(token, { type: 'bearer' });

      expect(response.body.code).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('There is no comic registered');
    });
  });

  describe('Add Comic Route should', () => {
    it('be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const newComic = {
        title: 'How to make good tests with jest',
        description: 'A comic about tests',
        publishDate: '27/05/2009',
        pageCount: 35,
        folder: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
      };

      const response = await request(server)
        .post('/api/v1/comic')
        .send(newComic)
        .auth(token, { type: 'bearer' });

      expect(response.body.code).toBe(StatusCodes.CREATED);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('New Comic added!');
    }, 15000);

    it('return 500 error when database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const newComic = {
        title: 'How to make good tests with jest',
        description: 'A comic about tests',
        publishDate: '27/05/2009',
        pageCount: 35,
        folder: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
      };

      const response = await request(server)
        .post('/api/v1/comic')
        .send(newComic)
        .auth(token, { type: 'bearer' });

      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });
  });

  describe('Get Single Comic route should', () => {
    it('be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const newComic = {
        title: 'How to make good tests with jest',
        description: 'A comic about tests',
        publishDate: '27/05/2009',
        pageCount: 35,
        folder: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
      };

      const ComicResponse = await request(server)
        .post('/api/v1/comic')
        .send(newComic)
        .auth(token, { type: 'bearer' });

      const ComicID = ComicResponse.body.data.result._id;

      const response = await request(server)
        .get(`/api/v1/comic/${ComicID}`)
        .auth(token, { type: 'bearer' });;

      expect(response.body.code).toBe(StatusCodes.OK);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('Single comic retrieved!');
      expect(response.body.data.result._id).toBe(`${ComicID}`);
    }, 15000);

    it('return 400 error when the id format is invalid', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .get('/api/v1/comic/invalid')
        .auth(token, { type: 'bearer' });

      expect(response.body.code).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('Id format is invalid');
    });

    it('return 500 error when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .get('/api/v1/comic/66329e3161d5caedd247e116')
        .auth(token, { type: 'bearer' });

      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });

    it('return 404 error when the id is not associated with an record', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .get('/api/v1/comic/66329e3161d5caedd247e116')
        .auth(token, { type: 'bearer' });

      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('there is no register asociated to this id');
    });
  });

  describe('Update Comic Route should', () => {
    it('be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const newComic = {
        title: 'How to make good tests',
        description: 'A comic about tests',
        publishDate: '27/05/2009',
        pageCount: 35,
        folder: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
      };

      const ComicResponse = await request(server)
        .post('/api/v1/comic')
        .send(newComic)
        .auth(token, { type: 'bearer' });

      const ComicID = ComicResponse.body.data.result._id;

      const newComicInfo = {
        title: 'How to make good tests with pytest',
        description: 'Another comic about tests, but with python',
        publishDate: '20/02/1991',
        folder: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAfbG2qFSS5c9d7PKn3OjRC6CE6vJzlwyyI5vl75GN2g&s',
        pageCount: 35
      };

      const response = await request(server)
        .put(`/api/v1/comic/${ComicID}`)
        .send(newComicInfo)
        .auth(token, { type: 'bearer' });;

      expect(response.body.code).toBe(StatusCodes.OK);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('The Comic were updated!');
      expect(response.body.data.result.title).toBe('How to make good tests with pytest');
    }, 15000);

    it('return 404 error when the id is not associated with an record', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const updateComic = {
        title: 'How to make good tests with jest',
        description: 'A comic about tests',
        publishDate: '27/05/2009',
        pageCount: 35,
        folder: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
      };

      const response = await request(server)
        .put('/api/v1/comic/66329e3161d5caedd247e116')
        .send(updateComic)
        .auth(token, { type: 'bearer' });

      expect(response.body.code).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('there is no register asociated to this id');
    });

    it('return 400 error when the id format is invalid', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const updateComic = {
        title: 'How to make good tests with jest',
        description: 'A comic about tests',
        publishDate: '27/05/2009',
        pageCount: 35,
        folder: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
      };

      const response = await request(server)
        .put('/api/v1/comic/invalid')
        .send(updateComic)
        .auth(token, { type: 'bearer' });

      expect(response.body.code).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('Id format is invalid');
    });

    it('return 500 error when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const updateComic = {
        title: 'How to make good tests with jest',
        description: 'A comic about tests',
        publishDate: '27/05/2009',
        pageCount: 35,
        folder: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
      };

      const response = await request(server)
        .put('/api/v1/comic/66329e3161d5caedd247e116')
        .send(updateComic)
        .auth(token, { type: 'bearer' });

      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });
  });

  describe('Delete Single Comic route should', () => {
    it('Delete Single Comic route should be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const newComic = {
        title: 'How to make good tests',
        description: 'A comic about tests',
        publishDate: '27/05/2009',
        pageCount: 35,
        folder: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
      };

      const ComicResponse = await request(server)
        .post('/api/v1/comic')
        .send(newComic)
        .auth(token, { type: 'bearer' });

      const ComicID = ComicResponse.body.data.result._id;

      const response = await request(server)
        .delete(`/api/v1/comic/${ComicID}`)
        .auth(token, { type: 'bearer' });;

      expect(response.body.code).toBe(StatusCodes.OK);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('Comic successfully deleted!');
      expect(response.body.data.result._id).toBe(`${ComicID}`);
    }, 15000);

    it('Delete comic route should return 500 error when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .delete('/api/v1/comic/66329e3161d5caedd247e116')
        .auth(token, { type: 'bearer' });

      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });

    it('Delete comic route should return 400 when the id format is invalid', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .delete('/api/v1/comic/invalid')
        .auth(token, { type: 'bearer' });

      expect(response.body.code).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('id format is invalid');
    });

    it('Delete comic route should return 404 when the id is not associated to an record', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .delete('/api/v1/comic/662fd0381de0f5238869721e')
        .auth(token, { type: 'bearer' });

      expect(response.body.code).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('the id is not associatded with an record');
    });
  });

  describe('Extra Comic Routes', () => {
    it('Reset Comic route should be working', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .get('/api/v1/reset-comics')
        .auth(token, { type: 'bearer' });

      expect(response.body.code).toBe(StatusCodes.OK);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('Comics successfully reseted!');
      expect(response.body.data.available).toBe(20);
    }, 15000);

    it('Reset comic route should return 500 error when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .get('/api/v1/reset-comics')
        .auth(token, { type: 'bearer' });

      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });

    it('Get by page count comic route should return 500 error when the database is not connected', async () => {
      await mongoose.connection.close();
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const response = await request(server)
        .get('/api/v1/comics/pageCount')
        .query({ pageCount: 30 })
        .auth(token, { type: 'bearer' });

      await mongoose.connect(mongoURI);
      expect(response.body.code).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    });

    it('Should have a longer response time due the empty cache', async () => {
      const token: string = serverConfig.USER_TOKEN_TEST!;

      const responseWithNoCache = await request(server)
        .get('/api/v1/fetch-comics')
        .auth(token, { type: 'bearer' });

      const responseTimeWithNoCache: number = Number(responseWithNoCache.headers['x-response-time']);

      const responseWithCache = await request(server)
        .get('/api/v1/fetch-comics')
        .auth(token, { type: 'bearer' });

      const responseTimeWithCache: number =  Number(responseWithCache.headers['x-response-time']);

      expect(responseTimeWithNoCache).toBeGreaterThan(responseTimeWithCache);
    });
  });

});