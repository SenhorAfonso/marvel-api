import { Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';
import Joi from 'joi';
import APIError from '../errors/APIError';

class ErrorhandlingMiddleware {

  static ErrorHandler(
    reqError: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const success: boolean = false;
    if (reqError instanceof APIError) {
      res.status(reqError.status).json({ code: reqError.status, success: false, error: { name: reqError.name, message: reqError.message } });
    } else if (reqError instanceof Joi.ValidationError) {
      const { type, errors } = ErrorhandlingMiddleware.formatJoiValidationErrors(reqError);

      res.status(StatusCodes.BAD_REQUEST).json({ code: StatusCodes.BAD_REQUEST, success, type, errors });
    }
  }

  static formatJoiValidationErrors(error: Joi.ValidationError) {
    const type = error.name;
    let errors: Array<{
      resource: string,
      message: string
    }> = [];

    errors = error.details.map(element => ({
      resource: element.path.toString(),
      message: element.message
    }));

    return { type, errors };
  }
}

export default ErrorhandlingMiddleware;