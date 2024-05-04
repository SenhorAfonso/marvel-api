import bcrypt from 'bcryptjs';
import APIUtils from '../../app/utils/APIUtils';
import IPagination from '../../interfaces/IPagination';

describe('Test utils', () => {
  describe('createQueryObject should', () => {
    it('return a valid object if a valid payload is passed as parameter', () => {
      const pagination: IPagination = {
        limit: '2',
        page: '0',
        skip: '1',
        sort: 'desc'
      };

      const res = APIUtils.createQueryObject(pagination);

      expect(res).toBeDefined();
      expect(res.limit).toBe(2);
      expect(typeof res.limit).toBe('number');
    });

    it('return a valid object if nothing is passed as parameter', () => {
      const res = APIUtils.createQueryObject();

      expect(res).toBeDefined();
      expect(res.limit).toBe(3);
      expect(typeof res.limit).toBe('number');
    });
  });

  describe('IsEmpty should', () => {
    it('return true if parameter is an empty array', () => {
      const res = APIUtils.isEmpty([]);

      expect(res).toBeTruthy();
    });

    it('return true if parameter is undefined', () => {
      let undefinedVar;
      const res = APIUtils.isEmpty(undefinedVar);

      expect(res).toBeTruthy();
    });
  });

  describe('passwordsDontMatch should', () => {
    it('return true if passwords do not match', async () => {
      const salt = await bcrypt.genSalt(1);
      const hashPassword = await bcrypt.hash('password', salt);
      const res = APIUtils.passwordsDontMatch('incorrectPassword', hashPassword);

      expect(res).toBeTruthy();
    });
  });

  describe('passwordsAreInvalid should', () => {
    describe('return true if', () => {
      it('passwords are empty', () => {
        const password: string = '';
        const confirmPassword: string = '';

        const res = APIUtils.passwordsAreInvalid(password, confirmPassword);

        expect(res).toBeTruthy();
      });

      it('passwords are differents', () => {
        const password: string = 'password';
        const confirmPassword: string = 'differentPassword';

        const res = APIUtils.passwordsAreInvalid(password, confirmPassword);

        expect(res).toBeTruthy();
      });
    });
    describe('return false if', () => {
      it('both password and confirmPassword are equals and not empty', () => {
        const password: string = 'password';
        const confirmPassword: string = 'password';

        const res = APIUtils.passwordsAreInvalid(password, confirmPassword);

        expect(res).toBeFalsy();
      });
    });
  });
});