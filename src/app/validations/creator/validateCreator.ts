import Joi from 'joi';

const MIN_NAME_LENGTH = 5;
const MIN_ROLE_LENGTH = 5;
const MIN_SAGA_LENGTH = 5;
const MIN_COLLECTION_SIZE = 0;

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
        .required()
        .min(MIN_SAGA_LENGTH),

      otherComics: Joi.array<string>()
        .required(),

      collectionSize: Joi.number()
        .min(MIN_COLLECTION_SIZE)
    });

    return validationObject;
  }

  static UpdateCreatorValidation() {
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