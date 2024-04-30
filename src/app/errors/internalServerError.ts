import { StatusCodes } from 'http-status-codes';
import APIError from './APIError';

class InternalServerError extends APIError {
  constructor(message: string = 'An unknown error occured. Please try again later') {
    super(message);
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = 'Internal-Server-Error';
  }
}

export default InternalServerError;