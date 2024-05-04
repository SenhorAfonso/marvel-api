import TestUtils from '../utils/testUtils';
import ValidateCreators from '../../app/validations/creator/validateCreator';

describe('Payload validation for add new Creator route', () => {

  describe('Validate name field and value', () => {
    it('Should return an "Name length must be at least 5 characters long" error', () => {

      const newCreator = {
        name: 'Stan',
        role: 'writer',
        sagaComic: 'Marvel',
        otherComics: []
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"name" length must be at least 5 characters long');
    });

    it('Should return an "Name is a required field" error', () => {

      const newCreator = {
        invalid: 'Stan Lee',
        role: 'writer',
        sagaComic: 'Marvel',
        otherComics: []
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"name" is required');
    });

    it('Should return an "Name is a required field" error', () => {

      const newCreator = {
        name: '',
        role: 'writer',
        sagaComic: 'Marvel',
        otherComics: []
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"name" is not allowed to be empty');
    });

  });

  describe('Validate role field and value', () => {
    it('Should return an "Role length must be at least 5 characters long" error', () => {

      const newCreator = {
        name: 'Stan Lee',
        role: 'r',
        sagaComic: 'Marvel',
        otherComics: []
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"role" length must be at least 5 characters long');
    });

    it('Should return an "Role is a required field" error', () => {

      const newCreator = {
        name: 'Stan Lee',
        invalid: 'writer',
        sagaComic: 'Marvel',
        otherComics: []
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"role" is required');
    });

    it('Should return an "Role is not allowed to be empty" error', () => {

      const newCreator = {
        name: 'Stan Lee',
        role: '',
        sagaComic: 'Marvel',
        otherComics: []
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"role" is not allowed to be empty');
    });

  });

  describe('Validate sagaComic field and value', () => {
    it('Should return an "sagaComic length must be at least 5 characters long" error', () => {

      const newCreator = {
        name: 'Stan Lee',
        role: 'writter',
        sagaComic: 'Mav',
        otherComics: []
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"sagaComic" length must be at least 5 characters long');
    });

    it('Should return an "SagaComic is a required field" error', () => {

      const newCreator = {
        name: 'Stan Lee',
        role: 'writer',
        invalid: 'Marvel',
        otherComics: []
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"sagaComic" is required');
    });

    it('Should return an "SagaComic is not allowed to be empty" error', () => {

      const newCreator = {
        name: 'Stan Lee',
        role: 'writter',
        sagaComic: '',
        otherComics: []
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"sagaComic" is not allowed to be empty');
    });

  });

  describe('Validate otherComics field and value', () => {
    it('Should return an "otherComics length must be at least 5 characters long" error', () => {

      const newCreator = {
        name: 'Stan Lee',
        role: 'writter',
        sagaComic: 'Marvel'
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"otherComics" is required');
    });

  });

  describe('Validate collectionSize field and value', () => {
    it('Should return an "collectionSize length must be at least 5 characters long" error', () => {

      const newCreator = {
        name: 'Stan Lee',
        role: 'writter',
        sagaComic: 'Marvel',
        otherComics: [],
        collectionSize: -1
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"collectionSize" must be greater than or equal to 0');
    });

    it('Should return an "collectionSize is a required field" error', () => {

      const newCreator = {
        name: 'Stan Lee',
        role: 'writer',
        sagaComic: 'Marvel',
        otherComics: [],
        collectionSize: []
      };

      const error = TestUtils.validateObject(newCreator, ValidateCreators.AddCreatorValidation()).error?.details[0].message;

      expect(error).toBe('"collectionSize" must be a number');
    });

  });

});