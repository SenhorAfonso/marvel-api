import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

class ValidationMiddleware {

  static ValidatePayload(
    target: 'body' | 'query' | 'params',
    joiValidationObject: Joi.ObjectSchema
  ) {
    return (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const { error } = joiValidationObject.validate(req[target], { abortEarly: false });

      if (error) {
        throw error;
      }

      return next();
    };
  }
}

export default ValidationMiddleware.ValidatePayload;