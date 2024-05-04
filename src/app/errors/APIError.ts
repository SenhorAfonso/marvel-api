import { StatusCodes } from 'http-status-codes';

class APIError extends Error {
  public status: number;

  constructor(message: string = 'An unknown error occured. Please try again later') {
    super(message);
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = 'Internal-Server-Error';
  }
}

export default APIError;