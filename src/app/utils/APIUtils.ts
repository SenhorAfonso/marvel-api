import bcrypt from 'bcryptjs';
import IPagination from '../../interfaces/IPagination';

class APIUtils {

  static createQueryObject(pagination?: IPagination) {
    const queryObject = {
      limit: Number(pagination?.limit) || 3,
      skip: Number(pagination?.skip) || 0,
      sort: pagination?.sort || 'asc',
      page: Number(pagination?.page) || 0
    };

    return queryObject;
  }

  static isEmpty(target: any | any[]) {
    if (Array.isArray(target)) {
      return target.length === 0;
    }
    return target === null || target === undefined;
  }

  static passwordsDontMatch(password: string, hash: string): boolean {
    const match = bcrypt.compareSync(password, hash);
    return !match;
  }

  static passwordsAreInvalid(password: string, confirmPassword: string): boolean {
    if (!password || !confirmPassword) {
      return true;
    }

    if (password !== confirmPassword) {
      return true;
    }

    return false;
  }

}

export default APIUtils;