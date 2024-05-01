import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthenticatedError from '../errors/unauthenticatedError';
import IJwtPayload from '../../interfaces/jwt/IJwtPayload';
import serverConfig from '../../configs/serverConfig';
import IAuthenticatedRequest from '../../interfaces/IAuthenticatedRequest';

class AuthenticationMiddleware {

  static AuthenticateToken(
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers.authorization!;

    if (AuthenticationMiddleware.authHeaderIsNotValid(authHeader)) {
      throw new UnauthenticatedError();
    }

    const token = authHeader.split(' ')[0];

    try {
      const { userID } = jwt.verify(token, serverConfig.JWT_SECRET!) as IJwtPayload;
      req.user = { userID };
      next();
    } catch (error) {
      throw new UnauthenticatedError();
    }
  }

  static authHeaderIsNotValid(token: string): boolean {
    return !token || !token.startsWith('Bearer ');
  }

}

export default AuthenticationMiddleware;