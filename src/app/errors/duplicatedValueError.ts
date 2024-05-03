import { StatusCodes } from 'http-status-codes';
import APIError from './APIError';

class DuplicatedValueError extends APIError {
  constructor(message: string = 'The entered value is already registered') {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
    this.name = 'Duplicated-Value-Error';
  }
}

export default DuplicatedValueError;