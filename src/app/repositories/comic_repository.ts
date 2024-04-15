import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import ICreateNewComic from '../../interfaces/comic/ICreateNewComic';
import comics_model from '../models/comics_model';

class ComicReposity {

  static async addNewComic(
    payload: ICreateNewComic
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
    const message: string = 'Comic successfully created!';
    const status: number = StatusCodes.CREATED;
    const success: boolean = true;

    const result = await comics_model.find();
    return { success, status, message, result };
  }

  static updateComicInfo() {
    return 'Updating comic info';
  }

  static deleteComicInfo() {
    return 'Deleting comic info';
  }
}

export default ComicReposity;