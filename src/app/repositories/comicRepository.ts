import mongoose from 'mongoose';
import ICreateComic from '../../interfaces/comic/ICreateComic';
import IUpdateComic from '../../interfaces/comic/IUpdateComic';
import comicsModel from '../models/comicsModel';
import IQueryObject from '../../interfaces/IQueryObject';
import ICacheOptions from '../../interfaces/ImongooseCacheOptions';
import InternalServerError from '../errors/internalServerError';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';
import APIUtils from '../utils/APIUtils';

class ComicRepository {

  static async saveComics(
    payload: ICreateComic[]
  ): Promise<{
    result: mongoose.Document[]
  }> {
    try{
      const result = await comicsModel.create(payload);
      return { result };
    } catch (error) {
      throw new InternalServerError();
    }
  }

  static async getAllComics(
    queryObject: IQueryObject
  ): Promise<{
    result: mongoose.Document[]
  }> {
    const { limit, skip, sort } = queryObject;
    const hashCache: ICacheOptions = {
      method: 'get'
    };

    const result = await comicsModel.find()
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .cache(hashCache);

    if (APIUtils.isEmpty(result)) {
      throw new NotFoundError('There is no comic registered');
    }

    return { result };
  }

  static async addComic(
    newComic: any
  ): Promise<{
    result: mongoose.Document
  }> {
    let result: mongoose.Document | null;
    try{
      result = await comicsModel.create(newComic);
    } catch (error) {
      throw new InternalServerError();
    }
    return { result };
  }

  static async getSingleComic(
    comicId: string
  ): Promise<{
    result: mongoose.Document
  }> {
    let result: mongoose.Document | null;

    try {
      result = await comicsModel.findById({ _id: comicId });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError('Id format is invalid');
      } else {
        throw new InternalServerError();
      }
    }

    if (APIUtils.isEmpty(result)) {
      throw new NotFoundError('there is no register asociated to this id');
    }

    return { result: result! };
  }

  static async updateComicInfo(
    comicId: string,
    newComicInfo: IUpdateComic
  ): Promise<{
    result: mongoose.Document
  }> {
    let result: mongoose.Document | null;

    try{
      result = await comicsModel.findByIdAndUpdate(comicId, newComicInfo, { new: true });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError('Id format is invalid');
      } else {
        throw new InternalServerError();
      }
    }

    if (APIUtils.isEmpty(result)) {
      throw new NotFoundError('there is no register asociated to this id');
    }

    return { result: result! };
  }

  static async deleteComicInfo(
    comicId: string
  ): Promise<{
    result: mongoose.Document
  }> {
    let result: mongoose.Document | null;

    try {
      result = await comicsModel.findById({ _id: comicId });
    } catch (error) {
      throw new InternalServerError();
    }

    return { result: result! };
  }

  static async deleteManyComics(): Promise<void> {
    try {
      await comicsModel.deleteMany({});
    } catch (error) {
      throw new InternalServerError();
    }
  }

  static async getByPageCount(
    threshold: number
  ): Promise<{
    result: mongoose.Document[]
  }> {
    let result: mongoose.Document[] | null;

    try {
      result = await comicsModel.find({ pageCount: { $gt: threshold } });
    } catch (error) {
      throw new InternalServerError();
    }

    return { result: result! };
  }
}

export default ComicRepository;