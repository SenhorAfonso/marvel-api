import { StatusCodes } from 'http-status-codes';
import APIError from './APIError';

class NotFoundError extends APIError {
  constructor(message: string = 'The resource searched was not found!') {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
    this.name = 'Not-Found-Error';
  }
}

export default NotFoundError;