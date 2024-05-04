import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import StatusCodes from 'http-status-codes';
import userModel from '../../app/models/userModel';
import server from '../../server';
import client from '../../app/models/extra/mongooseCache';

let mongoServer: MongoMemoryServer;
let mongoURI: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  mongoURI = mongoServer.getUri();
  await mongoose.connect(mongoURI);
});

afterEach(async () => {
  await userModel.collection.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
  await client.quit();
});

describe('Check user\'s login route\'s http responses', () => {

  it('Should return 200 status code when the user log-in successfully', async () => {

    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    const userLoginPayload = {
      email: 'pedroafonso@gmail.com',
      password: 'password123'
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(userLoginPayload);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('User successfully logged in!');
  });

  it('Should return 400 status code when the email is differente than the registered one', async () => {

    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    const userLoginPayload = {
      email: 'pedroafonso1@gmail.com',
      password: 'password123'
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(userLoginPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The email or password provided is incorrect!');
  });

  it('Should return 404 status code when the password is different than the registered one', async () => {

    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    const userLoginPayload = {
      email: 'pedroafonso@gmail.com',
      password: '123password'
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(userLoginPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The email or password provided is incorrect!');
  });

  it('Should return 400 status code when the payload is invalid', async () => {
    const userLoginPayload = {
      email: '',
      password: '',
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(userLoginPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors).toHaveLength(2);

  });

  it('Should return 500 when the database is not connected', async () => {
    await mongoose.connection.close();

    const userSignUpPayload = {
      email: 'pedroafonso@gmail.com',
      password: 'password123'
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(userSignUpPayload);

    await mongoose.connect(mongoURI);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    expect(response.body.success).toBeFalsy();

  });

});

describe('Check user\'s sign-up route\'s http response', () => {

  it('Should return 200 status code when the payload is valid', async () => {
    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    const response = await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('User successfully registered!');

  });

  it('Should return 400 status code when the passwords dont\'t match', async () => {
    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      password: 'password123',
      confirmPassword: '123password'
    };

    const response = await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The passwords do not match!');
  });

  it('Should return 400 status code when the email is already registered', async () => {
    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    const response = await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.error.message).toBe('The email is already in use');

  });

  it('Should return 400 status code when the payload is invalid', async () => {
    const userSignUpPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    const response = await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors).toHaveLength(4);

  });

  it('Should return 500 when the database is not connected', async () => {
    await mongoose.connection.close();

    const userSignUpPayload = {
      username: 'Pedro',
      email: 'pedroafonso@gmail.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    const response = await request(server)
      .post('/api/v1/user/signup')
      .send(userSignUpPayload);

    await mongoose.connect(mongoURI);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.error.message).toBe('An unknown error occured. Please try again later');
    expect(response.body.success).toBeFalsy();

  });

});