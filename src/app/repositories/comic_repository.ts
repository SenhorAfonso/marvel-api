import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import ICreate_comic from '../../interfaces/comic/ICreate_comic';
import IUpdate_comic from '../../interfaces/comic/IUpdate_comic';
import comics_model from '../models/comics_model';

class ComicReposity {

  static async addNewComic(
    payload: ICreate_comic
  ): Promise<{
    message: string;
    status: number;
    success: boolean;
    result: mongoose.Document
  }> {
    const message: string = 'Comic successfully created!';
    const status: number = StatusCodes.CREATED;
    const success: boolean = true;

    const result = await comics_model.create(payload);
    return { success, status, message, result };
  }

  static async getAllComics():
  Promise<{
    message: string;
    status: number,
    success: boolean,
    result: mongoose.Document[]
  }> {
    const message: string = 'All comics retrieved!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const result = await comics_model.find();
    return { success, status, message, result };
  }

  static async updateComicInfo(comicId: string, newComicInfo: IUpdate_comic): Promise<{
    message: string;
    status: number;
    success: boolean;
    result: mongoose.Document
  }> {
    const message: string = 'Comic updated!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const result = await comics_model.findByIdAndUpdate(comicId, newComicInfo, { new: true }) as mongoose.Document;
    return { success, status, message, result };
  }

  static async deleteComicInfo(comicId: string): Promise<{
    message: string;
    status: number;
    success: boolean;
    result: mongoose.Document
  }> {
    const message: string = 'Comic successfully deleted!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const result = await comics_model.findById({ _id: comicId }) as mongoose.Document;

    return { success, status, message, result };
  }
}

export default ComicReposity;