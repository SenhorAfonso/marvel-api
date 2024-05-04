import { StatusCodes } from 'http-status-codes';
import APIError from './APIError';

class BadRequestError extends APIError {
  constructor(message: string = 'The input sent is not valid!') {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
    this.name = 'Bad-Request-Error';
  }
}

export default BadRequestError;