import { Request, Response, NextFunction } from 'express';

class ErrorhandlingMiddleware {

  static ErrorHandler(
    reqError: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (reqError) {
      res.status(500).json({ deu: 'pau' });
    }
  }
}

export default ErrorhandlingMiddleware;