import { StatusCodes } from 'http-status-codes';
import creatorSchema from '../models/creator_schema';
import ICreators from '../../interfaces/creators/ICreators';
import IUpdateCreatorInfo from '../../interfaces/creators/IUpdateCreatorInfo';
import mongoose from 'mongoose';

class CreatorRepository {

  static async saveCreators(
    creators: Array<ICreators>
  ): Promise<{
    success: boolean,
    message: string,
    status: number,
    result: mongoose.Document[]
  }> {
    const success: boolean = true;
    const message: string = 'The creators were registered!';
    const status: number = StatusCodes.OK;

    const result = await creatorSchema.create(creators);
    return { success, message, status, result };
  }

  static async getCreators(): Promise<{
    success: boolean,
    message: string,
    status: number,
    result: mongoose.Document[]
  }> {
    const success: boolean = true;
    const message: string = 'All creators were retrieved!';
    const status: number = StatusCodes.OK;

    const result = await creatorSchema.find();
    return { success, message, status, result };
  }

  static async updateCreator(
    payload: IUpdateCreatorInfo
  ): Promise<{
    success: boolean,
    message: string,
    status: number,
    result: mongoose.Document
  }> {
    const success: boolean = true;
    const message: string = 'The creator were updated!';
    const status: number = StatusCodes.OK;
    const { creatorID, ...newInfoCreator } = payload;

    let creatorToUpdate = await creatorSchema.findById({ _id: creatorID });

    if (!creatorToUpdate) {
      throw new Error(`The id ${creatorID} is not associated with an record`);
    }

    creatorToUpdate = await creatorSchema.findByIdAndUpdate({ _id: creatorID }, newInfoCreator, { new: true });
    return { success, message, status, result: creatorToUpdate! };
  }

  static async deleteCreator(
    creatorID: string
  ): Promise<{
    success: boolean,
    message: string,
    status: number,
    result: mongoose.Document
  }> {
    const success: boolean = true;
    const message: string = 'Creator deleted';
    const status: number = StatusCodes.OK;

    const creatorToDelete = await creatorSchema.findByIdAndDelete({ _id: creatorID });

    if (!creatorToDelete) {
      throw new Error(`The id ${creatorID} is not associated with an record`);
    }

    await creatorSchema.findByIdAndDelete({ _id: creatorID });

    return { success, message, status, result: creatorToDelete };
  }

}

export default CreatorRepository;