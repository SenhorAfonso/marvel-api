import Joi from 'joi';

const MIN_TITLE_LENGTH = 5;
const MIN_DESC_LENGTH = 5;

class ValidateComics {

  static CreateComicValication() {
    const validationObject = Joi.object({
      title: Joi.string()
        .min(MIN_TITLE_LENGTH)
        .required(),

      description: Joi.string()
        .min(MIN_DESC_LENGTH)
        .required(),

      publishDate: Joi.string()
        .required(),

      pageCount: Joi.number()
        .required(),

      folder: Joi.string()
        .required()
    });

    return validationObject;
  }

}

export default ValidateComics;