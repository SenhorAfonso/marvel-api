import Joi from 'joi';

const MIN_NAME_LENGTH = 5;
const MIN_DESC_LENGTH = 5;

class ValidateCharacters {

  static CreateCharacterValidation() {
    const validationObject = Joi.object({
      name: Joi.string()
        .min(MIN_NAME_LENGTH)
        .required(),

      description: Joi.string()
        .min(MIN_DESC_LENGTH)
        .required(),

      thumbnail: Joi.string()
        .required(),

      comic: Joi.string()
        .required(),

      comicCount: Joi.number()
        .required()
    });

    return validationObject;
  }

  static UpdateCharacterValidation() {
    const validationObject = Joi.object({
      name: Joi.string()
        .min(MIN_NAME_LENGTH)
        .required(),

      description: Joi.string()
        .min(MIN_DESC_LENGTH)
        .required(),

      thumbnail: Joi.string()
        .required(),

      comic: Joi.string()
        .required(),

      comicCount: Joi.number()
        .required()
    });

    return validationObject;
  }

}

export default ValidateCharacters;