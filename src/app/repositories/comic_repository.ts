import mongoose from 'mongoose';
import ICreateComic from '../../interfaces/comic/ICreate_comic';
import IUpdateComic from '../../interfaces/comic/IUpdate_comic';
import comicsModel from '../models/comics_model';
import IPagination from '../../interfaces/IPagination';

class ComicRepository {

  static async saveComics(
    payload: ICreateComic[]
  ): Promise<{
    result: mongoose.Document[]
  }> {
    const result = await comicsModel.create(payload);
    return { result };
  }

  static async getAllComics(pagination: IPagination): Promise<{
    result: mongoose.Document[]
  }> {
    const { limit, skip, sort } = pagination;

    const result = await comicsModel.find()
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .cache();

    return { result };
  }

  static async updateComicInfo(comicId: string, newComicInfo: IUpdateComic): Promise<{
    result: mongoose.Document
  }> {
    const result = await comicsModel.findByIdAndUpdate(comicId, newComicInfo, { new: true }) as mongoose.Document;
    return { result };
  }

  static async deleteComicInfo(comicId: string): Promise<{
    result: mongoose.Document
  }> {
    const result = await comicsModel.findById({ _id: comicId }) as mongoose.Document;
    return { result };
  }
}

export default ComicRepository;