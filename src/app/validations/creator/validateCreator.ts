import Joi from 'joi';

const MIN_NAME_LENGTH = 5;
const MIN_ROLE_LENGTH = 5;

class ValidateCreators {

  static AddCreatorValidation() {
    const validationObject = Joi.object({
      name: Joi.string()
        .min(MIN_NAME_LENGTH)
        .required(),

      role: Joi.string()
        .min(MIN_ROLE_LENGTH)
        .required(),

      sagaComic: Joi.string()
        .required(),

      otherComics: Joi.array<string>()
        .required(),

      collectionSize: Joi.number()
    });

    return validationObject;
  }

}

export default ValidateCreators;