import { Request } from 'express';

interface IAuthenticatedRequest extends Request {
  user: {
    userID: string
  }
}

export default IAuthenticatedRequest;