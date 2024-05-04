import BadRequestError from '../../app/errors/badRequestError';
import InternalServerError from '../../app/errors/internalServerError';
import NotFoundError from '../../app/errors/notFoundError';
import UnauthenticatedError from '../../app/errors/unauthenticatedError';
import DuplicatedValueError from '../../app/errors/duplicatedValueError';
import APIError from '../../app/errors/APIError';

describe('Check if errors status code, name and message are correct', () => {

  describe('UnauthenticatedError should', () => {

    it('UnauthenticatedError should be working properly even without a argument in constructor', () => {

      try {
        throw new UnauthenticatedError();
      } catch (error: any) {
        expect(error).toStrictEqual(new UnauthenticatedError());
        expect(error.name).toBe('Unauthenticated-Error');
        expect(error.message).toBe('You do not permissions to access this content!');
      }

    });

    it('UnauthenticatedError should have a different message if it is passed in constructor', () => {

      try {
        throw new UnauthenticatedError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new UnauthenticatedError('Different message'));
        expect(error.name).toBe('Unauthenticated-Error');
        expect(error.message).toBe('Different message');
      }

    });

  });

  describe('BadRequestError should', () => {

    it('BadRequestError should be working properly even without a argument in constructor', () => {

      try {
        throw new BadRequestError();
      } catch (error: any) {
        expect(error).toStrictEqual(new BadRequestError());
        expect(error.name).toBe('Bad-Request-Error');
        expect(error.message).toBe('The input sent is not valid!');
      }

    });

    it('BadRequestError should have a different message if it is passed in constructor', () => {

      try {
        throw new BadRequestError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new BadRequestError('Different message'));
        expect(error.name).toBe('Bad-Request-Error');
        expect(error.message).toBe('Different message');
      }

    });

  });

  describe('DuplicatedValueError should', () => {

    it('be working properly even without a argument in constructor', () => {

      try {
        throw new DuplicatedValueError();
      } catch (error: any) {
        expect(error).toStrictEqual(new DuplicatedValueError());
        expect(error.name).toBe('Duplicated-Value-Error');
        expect(error.message).toBe('The entered value is already registered');
      }

    });

    it('have a different message if it is passed in constructor', () => {

      try {
        throw new DuplicatedValueError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new DuplicatedValueError('Different message'));
        expect(error.name).toBe('Duplicated-Value-Error');
        expect(error.message).toBe('Different message');
      }

    });

  });

  describe('APIError should', () => {

    it('be working properly even without a argument in constructor', () => {

      try {
        throw new APIError();
      } catch (error: any) {
        expect(error).toStrictEqual(new APIError());
        expect(error.name).toBe('Internal-Server-Error');
        expect(error.message).toBe('An unknown error occured. Please try again later');
      }

    });

    it('have a different message if it is passed in constructor', () => {

      try {
        throw new APIError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new APIError('Different message'));
        expect(error.name).toBe('Internal-Server-Error');
        expect(error.message).toBe('Different message');
      }

    });
  });

  describe('InternalServerError should', () => {

    it('be working properly even without a argument in constructor', () => {

      try {
        throw new InternalServerError();
      } catch (error: any) {
        expect(error).toStrictEqual(new InternalServerError());
        expect(error.name).toBe('Internal-Server-Error');
        expect(error.message).toBe('An unknown error occured. Please try again later');
      }

    });

    it('have a different message if it is passed in constructor', () => {

      try {
        throw new InternalServerError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new InternalServerError('Different message'));
        expect(error.name).toBe('Internal-Server-Error');
        expect(error.message).toBe('Different message');
      }

    });
  });

  describe('NotFoundError should', () => {

    it('be working properly even without a argument in constructor', () => {

      try {
        throw new NotFoundError();
      } catch (error: any) {
        expect(error).toStrictEqual(new NotFoundError());
        expect(error.name).toBe('Not-Found-Error');
        expect(error.message).toBe('The resource searched was not found!');
      }

    });

    it('have a different message if it is passed in constructor', () => {

      try {
        throw new NotFoundError('Different message');
      } catch (error: any) {
        expect(error).toStrictEqual(new NotFoundError('Different message'));
        expect(error.name).toBe('Not-Found-Error');
        expect(error.message).toBe('Different message');
      }

    });
  });
});
