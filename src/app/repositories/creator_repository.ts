import mongoose from 'mongoose';
import creatorModel from '../models/creatorModel';
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
    const result = await creatorModel.create(creators);
    return { result };
  }

  static async getCreators(queryObject: IQueryObject): Promise<{
    result: mongoose.Document[]
  }> {
    const { limit, skip, sort } = queryObject;
    const hashCache: ICacheOptions = {
      method: 'get'
    };

    const result = await creatorModel
      .find()
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .cache(hashCache);

    return { result };
  }

  static async getSingleCreator(creatorID: string) {
    const result = await creatorModel.findById({ _id: creatorID });
    return { result };
  }

  static async addCreator(newCreator: any) {
    const result = await creatorModel.create(newCreator);
    return { result };
  }

  static async updateCreator(
    payload: IUpdateCreatorInfo
  ): Promise<{
    result: mongoose.Document
  }> {

    const { creatorID, ...newInfoCreator } = payload;

    let creatorToUpdate = await creatorModel.findById({ _id: creatorID });

    if (!creatorToUpdate) {
      throw new Error(`The id ${creatorID} is not associated with an record`);
    }

    creatorToUpdate = await creatorModel.findByIdAndUpdate({ _id: creatorID }, newInfoCreator, { new: true });
    return { result: creatorToUpdate! };
  }

  static async deleteCreator(
    creatorID: string
  ): Promise<{
    result: mongoose.Document
  }> {
    const creatorToDelete = await creatorModel.findByIdAndDelete({ _id: creatorID });

    if (!creatorToDelete) {
      throw new Error(`The id ${creatorID} is not associated with an record`);
    }

    await creatorModel.findByIdAndDelete({ _id: creatorID });

    return { result: creatorToDelete };
  }

  static async deleteManyCreators() {
    await creatorModel.deleteMany({});
  }

  static async getByCollectionSize(collSize: number): Promise<mongoose.Document[]> {
    const result = await creatorModel.find({ collectionSize: { $gt: collSize } });
    return result;
  }

  static async getByNameLength(nameLength: number): Promise<mongoose.Document[]> {
    const result = await creatorModel.find({ $where: `this.name.length > ${nameLength}` });
    return result;
  }

}

export default CreatorRepository;