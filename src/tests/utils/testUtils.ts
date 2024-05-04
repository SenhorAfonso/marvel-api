import Joi from 'joi';

class TestUtils {

  static validateObject(
    target: object,
    joiValidationObject: Joi.ObjectSchema
  ) {
    const error = joiValidationObject.validate(target, { abortEarly: false });
    return error;
  };

}

export default TestUtils;