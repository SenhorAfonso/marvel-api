import IPagination from '../../interfaces/IPagination';

class APIUtils {

  static createQueryObject(pagination: IPagination) {
    const queryObject = {
      limit: Number(pagination.limit) || 3,
      skip: Number(pagination.skip) || 0,
      sort: pagination.sort || 'asc',
      page: Number(pagination.page) || 0
    };

    return queryObject;
  }

}

export default APIUtils;