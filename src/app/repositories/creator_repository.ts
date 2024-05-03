import mongoose from 'mongoose';
import creatorModel from '../models/creatorModel';
import ICreators from '../../interfaces/creators/ICreators';
import IUpdateCreatorInfo from '../../interfaces/creators/IUpdateCreatorInfo';
import ICacheOptions from '../../interfaces/ImongooseCacheOptions';
import IQueryObject from '../../interfaces/IQueryObject';
import InternalServerError from '../errors/internalServerError';
import BadRequestdError from '../errors/badRequestError';
import APIUtils from '../utils/APIUtils';
import NotFoundError from '../errors/notFoundError';

class CreatorRepository {

  static async saveCreators(
    creators: Array<ICreators>
  ): Promise<{
    result: mongoose.Document[]
  }> {
    let result: mongoose.Document[] | null;

    try {
      result = await creatorModel.create(creators);
    } catch (error) {
      throw new InternalServerError();
    }

    return { result };
  }

  static async getCreators(
    queryObject: IQueryObject
  ): Promise<{
    result: mongoose.Document[]
  }> {
    const { limit, skip, sort } = queryObject;
    const hashCache: ICacheOptions = {
      method: 'get'
    };

    let result: mongoose.Document[] | null;

    try {
      result = await creatorModel
        .find()
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .cache(hashCache);
    } catch (error) {
      throw new InternalServerError();
    }

    if (APIUtils.isEmpty(result)) {
      throw new NotFoundError('There is no creatores registered!');
    }

    return { result: result! };
  }

  static async getSingleCreator(
    creatorID: string
  ): Promise<{
    result: mongoose.Document
  }> {
    let result: mongoose.Document | null;

    try {
      result = await creatorModel.findById({ _id: creatorID });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestdError('Id format is invalid');
      } else {
        throw new InternalServerError();
      }
    }

    if (APIUtils.isEmpty(result)) {
      throw new NotFoundError('There is no creator with such id');
    }

    return { result: result! };
  }

  static async addCreator(
    newCreator: any
  ): Promise<{
    result: mongoose.Document
  }> {
    let result: mongoose.Document | null;
    try {
      result = await creatorModel.create(newCreator);
    } catch (error) {
      throw new InternalServerError();
    }

    return { result };
  }

  static async updateCreator(
    payload: IUpdateCreatorInfo
  ): Promise<{
    result: mongoose.Document
  }> {
    const { creatorID, ...newInfoCreator } = payload;

    let creatorToUpdate: mongoose.Document | null = null;

    try {
      creatorToUpdate = await creatorModel.findById({ _id: creatorID });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestdError('Id format is invalid');
      }
      throw new InternalServerError();
    }

    if (APIUtils.isEmpty(creatorToUpdate)) {
      throw new NotFoundError(`The id ${creatorID} is not associated with an record`);
    }

    creatorToUpdate = await creatorModel.findByIdAndUpdate({ _id: creatorID }, newInfoCreator, { new: true });
    return { result: creatorToUpdate! };
  }

  static async deleteCreator(
    creatorID: string
  ): Promise<{
    result: mongoose.Document
  }> {
    let creatorToDelete: mongoose.Document | null = null;

    try {
      creatorToDelete = await creatorModel.findByIdAndDelete({ _id: creatorID });
    } catch (error) {
      if (error) {
        if (error instanceof mongoose.Error.CastError) {
          throw new BadRequestdError('Id format is invalid');
        } else {
          throw new InternalServerError();
        }
      }
    }

    if (APIUtils.isEmpty(creatorToDelete)) {
      throw new NotFoundError(`The id ${creatorID} is not associated with an record`);
    }

    await creatorModel.findByIdAndDelete({ _id: creatorID });

    return { result: creatorToDelete! };
  }

  static async deleteManyCreators() {
    try {
      await creatorModel.deleteMany({});
    } catch (error) {
      throw new InternalServerError();
    }
  }

  static async getByCollectionSize(
    collSize: number
  ): Promise<{
    result: mongoose.Document[]
  }> {
    let result: mongoose.Document[] | null;

    try {
      result = await creatorModel.find({ collectionSize: { $gt: collSize } });
    } catch (error) {
      throw new InternalServerError();
    }

    if (APIUtils.isEmpty(result)) {
      throw new NotFoundError();
    }

    return { result };
  }

  static async getByNameLength(
    nameLength: number
  ): Promise<{
    result: mongoose.Document[]
  }> {
    let result: mongoose.Document[] | null;

    try {
      result = await creatorModel.find({ $where: `this.name.length > ${nameLength}` });
    } catch (error) {
      throw new InternalServerError();
    }

    if (APIUtils.isEmpty(result)) {
      throw new NotFoundError();
    }

    return { result };
  }

}

export default CreatorRepository;