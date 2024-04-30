/* eslint-disable */
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import server from '../../server';
import client from '../../app/models/extra/mongooseCache';
import charactersModel from '../../app/models/charactersModel';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

describe('Check for Characters Entity\'s routes', () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoURI = mongoServer.getUri();
    await mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    client.flushall();
    await charactersModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.close();
    await client.quit();
  });

  it.skip('Fetch route should be working', async () => {
    const response = await request(server)
      .get('/api/v1/fetch-characters');

  }, 10000);

  it('Get all route should be working', async () => {
    await request(server).get('/api/v1/characters');
    const response = await request(server)
      .get('/api/v1/characters');

    expect(response.body.code).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('All characters were retrieved!');
  }, 15000);

  it('Add Character route should be working', async () => {
    const newCharacter = {
      name: 'Flash',
      description: "I'm not meant to be here!",
      thumbnail: 'https://static.wikia.nocookie.net/dccomics/images/b/b3/The_Flash_Vol_1_782_Textless_Variant.jpg/revision/latest?cb=20230714165251&path-prefix=pt',
      comic: 'Flashpoint'
    };

    const response = await request(server)
      .post('/api/v1/character')
      .send(newCharacter);


    expect(response.body.code).toBe(StatusCodes.CREATED);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('New character added!');
    expect(response.body.data.result.name).toBe('Flash');
  }, 15000);

  it('Get Single Comic route should be working', async () => {
    const newCharacter = {
      name: 'Flash',
      description: "I'm not meant to be here!",
      thumbnail: 'https://static.wikia.nocookie.net/dccomics/images/b/b3/The_Flash_Vol_1_782_Textless_Variant.jpg/revision/latest?cb=20230714165251&path-prefix=pt',
      comic: 'Flashpoint'
    };

    const characterResponse = await request(server)
      .post('/api/v1/character')
      .send(newCharacter);

    const characterID = characterResponse.body.data.result._id;

    const response = await request(server)
      .get(`/api/v1/character/${characterID}`);

    expect(response.body.code).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Single character retrieved!');
    expect(response.body.data).toBeDefined();
  }, 15000);

  it('Update Comic info route should be working', async () => {
    const newCharacter = {
      name: 'Flash',
      description: "I'm not meant to be here!",
      thumbnail: 'https://static.wikia.nocookie.net/dccomics/images/b/b3/The_Flash_Vol_1_782_Textless_Variant.jpg/revision/latest?cb=20230714165251&path-prefix=pt',
      comic: 'Flashpoint'
    };

    const ComicResponse = await request(server)
      .post('/api/v1/character')
      .send(newCharacter);

    const comicID = ComicResponse.body.data.result._id;

    const newCharacterInfo = {
      name: 'Mercury',
      description: "Speedster who died from a gunshot!",
      thumbnail: 'https://static.wikia.nocookie.net/dccomics/images/b/b3/The_Flash_Vol_1_782_Textless_Variant.jpg/revision/latest?cb=20230714165251&path-prefix=pt',
      comic: 'Flashpoint'
    };

    const response = await request(server)
      .put(`/api/v1/character/${comicID}`)
      .send(newCharacterInfo);

    expect(response.body.code).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('The character were updated!');
  }, 15000);

  it('Delete Single Comic route should be working', async () => {
    const newCharacter = {
      name: 'Cretor Teste',
      role: 'Tester',
      sagaComic: ''
    };

    const ComicResponse = await request(server)
      .post('/api/v1/character')
      .send(newCharacter);

    const ComicID = ComicResponse.body.data.result._id;

    const response = await request(server)
      .delete(`/api/v1/character/${ComicID}`);

    expect(response.status).toBe(StatusCodes.NO_CONTENT)
  }, 15000);

  it('Reset Comic route should be working', async () => {
    const response = await request(server)
      .get('/api/v1/reset-characters');

    expect(response.body.code).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Characters successfully reseted!')
  }, 15000);

});