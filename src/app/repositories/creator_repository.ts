import { StatusCodes } from 'http-status-codes';
import creatorSchema from '../models/creator_schema';
import ICreators from '../../interfaces/creators/ICreators';
import IUpdateCreatorInfo from '../../interfaces/creators/IUpdateCreatorInfo';

class CreatorRepository {

  static async saveCreators(creators: Array<ICreators>) {
    const result = await creatorSchema.create(creators);
    return result;
  }

  static async getCreators() {
    const success: boolean = true;
    const message: string = 'All cretors were retrieved!';
    const status: number = StatusCodes.OK;

    const result = await creatorSchema.find();
    return { success, message, status, result };
  }

  static async updateCreator(payload: IUpdateCreatorInfo) {
    const { creatorID, ...newInfoCreator } = payload;

    const creatorToUpdate = await creatorSchema.findById({ _id: creatorID });

    if (!creatorToUpdate) {
      throw new Error(`The id ${creatorID} is not associated with an record`);
    }

    const result = await creatorSchema.findByIdAndUpdate({ _id: creatorID }, newInfoCreator, { new: true });
    return result;
  }

  static deleteCreator() {
    const result = 'Deleting a creator';
    return result;
  }

}

export default CreatorRepository;