import { StatusCodes } from 'http-status-codes';
import creatorSchema from '../models/creator_schema';
import ICreators from '../../interfaces/creators/ICreators';

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

  static updateCreator() {
    const result = 'Updating a creator';
    return result;
  }

  static deleteCreator() {
    const result = 'Deleting a creator';
    return result;
  }

}

export default CreatorRepository;