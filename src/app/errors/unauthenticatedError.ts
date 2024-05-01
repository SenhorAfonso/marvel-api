import { StatusCodes } from 'http-status-codes';
import APIError from './APIError';

class UnauthenticatedError extends APIError {
  constructor(message: string = 'You do not permissions to access this content!') {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
    this.name = 'Unauthenticated-Error';
  }

}

export default UnauthenticatedError;