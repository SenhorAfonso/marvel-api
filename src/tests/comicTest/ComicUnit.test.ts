import TestUtils from '../utils/testUtils';
import ValidateComics from '../../app/validations/comics/validateComic';

describe('Payload validation for add new Comic route', () => {

  describe('Validate title field and value', () => {
    it('Should return an "Title length must be at least 5 characters long" error', () => {

      const newComic = {
        title: 'xxx',
        description: 'writer',
        publishDate: 'Marvel',
        pageCount: 35,
        folder: 'urltoanimage'
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"title" length must be at least 5 characters long');
    });

    it('Should return an "Title is a required field" error', () => {

      const newComic = {
        invalid: 'The adventures of xxx',
        description: 'writer',
        publishDate: 'Marvel',
        pageCount: 35,
        folder: 'urltoanimage'
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"title" is required');
    });

    it('Should return an "Title is not allowed to be empty" error', () => {

      const newComic = {
        title: '',
        description: 'writer',
        publishDate: 'Marvel',
        pageCount: 35,
        folder: 'urltoanimage'
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"title" is not allowed to be empty');
    });

  });

  describe('Validate description field and value', () => {
    it('Should return an "Role length must be at least 5 characters long" error', () => {

      const newComic = {
        title: 'The adventures of xxx',
        description: 'xxx',
        publishDate: 'Marvel',
        pageCount: 35,
        folder: 'urltoanimage'
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"description" length must be at least 5 characters long');
    });

    it('Should return an "Role is a required field" error', () => {

      const newComic = {
        title: 'The adventures of xxx',
        invalid: 'writer',
        publishDate: 'Marvel',
        pageCount: 35,
        folder: 'urltoanimage'
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"description" is required');
    });

    it('Should return an "Role is not allowed to be empty" error', () => {

      const newComic = {
        title: 'The adventures of xxx',
        description: '',
        publishDate: 'Marvel',
        pageCount: 35,
        folder: 'urltoanimage'
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"description" is not allowed to be empty');
    });

  });

  describe('Validate publishDate field and value', () => {
    it('Should return an "publishDate length must be at least 5 characters long" error', () => {

      const newComic = {
        title: 'The adventures of xxx',
        description: 'writter',
        publishDate: '',
        pageCount: 35,
        folder: 'urltoanimage'
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"publishDate" is not allowed to be empty');
    });

    it('Should return an "publishDate is required" error', () => {

      const newComic = {
        title: 'The adventures of xxx',
        description: 'writter',
        invalid: '19/12/1971',
        pageCount: 35,
        folder: 'urltoanimage'
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"publishDate" is required');
    });
  });

  describe('Validate pageCount field and value', () => {

    it('Should return an "pageCount is a required field" error', () => {

      const newComic = {
        title: 'The adventures of xxx',
        description: 'writer',
        publishDate: '19/12/1971',
        invalid: 35,
        folder: 'urltoanimage'
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"pageCount" is required');
    });

    it('Should return an "pageCount must be a number" error', () => {

      const newComic = {
        title: 'The adventures of xxx',
        description: 'writter',
        publishDate: '19/12/1971',
        pageCount: '',
        folder: 'urltoanimage'
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"pageCount" must be a number');
    });

  });

  describe('Validate folder field and value', () => {

    it('Should return an "Folder is a required field" error', () => {

      const newComic = {
        title: 'The adventures of xxx',
        description: 'writer',
        publishDate: 'Marvel',
        pageCount: 35,
        invalid: 'urltoanimage'
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"folder" is required');
    });

    it('Should return an "Folder is not allowed to be empty" error', () => {

      const newComic = {
        title: 'The adventures of xxx',
        description: 'writer',
        publishDate: 'Marvel',
        pageCount: 35,
        folder: ''
      };

      const error = TestUtils.validateObject(newComic, ValidateComics.CreateComicValidation()).error?.details[0].message;

      expect(error).toBe('"folder" is not allowed to be empty');
    });

  });

});