import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import ICreateComic from '../../interfaces/comic/ICreate_comic';
import IUpdateComic from '../../interfaces/comic/IUpdate_comic';
import comicsModel from '../models/comics_model';

class ComicRepository {

  static async saveComics(
    payload: ICreateComic[]
  ): Promise<{
    message: string;
    status: number;
    success: boolean;
    result: mongoose.Document[]
  }> {
    const message: string = 'Comics successfully fetched from API!';
    const status: number = StatusCodes.CREATED;
    const success: boolean = true;

    const result = await comicsModel.create(payload);
    return { success, status, message, result };
  }

  static async getAllComics(): Promise<{
    message: string;
    status: number,
    success: boolean,
    result: mongoose.Document[]
  }> {
    const message: string = 'All comics retrieved!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const result = await comicsModel.find();
    return { success, status, message, result };
  }

  static async updateComicInfo(comicId: string, newComicInfo: IUpdateComic): Promise<{
    message: string;
    status: number;
    success: boolean;
    result: mongoose.Document
  }> {
    const message: string = 'Comic updated!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const result = await comicsModel.findByIdAndUpdate(comicId, newComicInfo, { new: true }) as mongoose.Document;
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

    const result = await comicsModel.findById({ _id: comicId }) as mongoose.Document;

    return { success, status, message, result };
  }
}

export default ComicRepository;