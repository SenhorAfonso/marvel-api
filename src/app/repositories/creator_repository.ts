import mongoose from 'mongoose';
import creatorSchema from '../models/creator_schema';
import ICreators from '../../interfaces/creators/ICreators';
import IUpdateCreatorInfo from '../../interfaces/creators/IUpdateCreatorInfo';
import ICacheOptions from '../../interfaces/ImongooseCacheOptions';
import IQueryObject from '../../interfaces/IQueryObject';

class CreatorRepository {

  static async saveCreators(
    creators: Array<ICreators>
  ): Promise<{
    result: mongoose.Document[]
  }> {
    const result = await creatorSchema.create(creators);
    return { result };
  }

  static async getCreators(queryObject: IQueryObject): Promise<{
    result: mongoose.Document[]
  }> {
    const { limit, skip, sort } = queryObject;
    const hashCache: ICacheOptions = {
      method: 'get'
    };

    const result = await creatorSchema
      .find()
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .cache(hashCache);

    return { result };
  }

  static async getSingleCreator(creatorID: string) {
    const result = await creatorSchema.findById({ _id: creatorID });
    return { result };
  }

  static async addCreator(newCreator: any) {
    const result = await creatorSchema.create(newCreator);
    return { result };
  }

  static async updateCreator(
    payload: IUpdateCreatorInfo
  ): Promise<{
    result: mongoose.Document
  }> {

    const { creatorID, ...newInfoCreator } = payload;

    let creatorToUpdate = await creatorSchema.findById({ _id: creatorID });

    if (!creatorToUpdate) {
      throw new Error(`The id ${creatorID} is not associated with an record`);
    }

    creatorToUpdate = await creatorSchema.findByIdAndUpdate({ _id: creatorID }, newInfoCreator, { new: true });
    return { result: creatorToUpdate! };
  }

  static async deleteCreator(
    creatorID: string
  ): Promise<{
    result: mongoose.Document
  }> {
    const creatorToDelete = await creatorSchema.findByIdAndDelete({ _id: creatorID });

    if (!creatorToDelete) {
      throw new Error(`The id ${creatorID} is not associated with an record`);
    }

    await creatorSchema.findByIdAndDelete({ _id: creatorID });

    return { result: creatorToDelete };
  }

  static async deleteManyCreators() {
    await creatorSchema.deleteMany({});
  }

}

export default CreatorRepository;