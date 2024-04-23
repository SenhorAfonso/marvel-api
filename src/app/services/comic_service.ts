import mongoose from 'mongoose';
import ComicRepository from '../repositories/comic_repository';
import IUpdateComic from '../../interfaces/comic/IUpdate_comic';
import serverConfig from '../../configs/serverConfig';
import IComicModel from '../../interfaces/comic/IComic_model';
import IHasResponseBody from '../../interfaces/IHasResponseBody';
import IComicResponseBody from '../../interfaces/comic/IComicResponseBody';
import IPagination from '../../interfaces/IPagination';
import APIUtils from '../utils/APIUtils';
import client from '../models/extra/mongooseCache';
import IQueryObject from '../../interfaces/IQueryObject';

class ComicService {

  static async fetchComics(): Promise<{ result: mongoose.Document[] }> {
    const cachedValue = await client.get('fetch-comics');
    let result: mongoose.Document[];

    if (cachedValue) {
      await client.set('fetch-comics', cachedValue, 'EX', serverConfig.CACHE_EXPIRATION_TIME!);
      result = JSON.parse(cachedValue);
    } else {
      const comicsRequest = await fetch(`https://gateway.marvel.com/v1/public/comics${serverConfig.MARVEL_API_AUTH}&title=Secret%20Wars`);
      const comicsResponseBody: IHasResponseBody<IComicResponseBody> = await comicsRequest.json();

      const comicsArray = comicsResponseBody.data.results;
      const filteredComicsArray: IComicModel[] = [];

      comicsArray.forEach(marvelComic => {
        const comic = {
          title: marvelComic.title,
          description: marvelComic.description,
          publishDate: marvelComic.dates[0].date,
          folder: marvelComic.thumbnail.path + serverConfig.IMAGE_QUALITY + serverConfig.IMAGE_QUALITY
        };
        filteredComicsArray.push(comic);
      });

      ({ result } = await ComicRepository.saveComics(filteredComicsArray));
      await client.set('fetch-comics', JSON.stringify(result), 'EX', serverConfig.CACHE_EXPIRATION_TIME!);

    }
    return { result };
  }

  static getAllComics(pagination: IPagination) {
    const queryObject: IQueryObject = APIUtils.createQueryObject(pagination);
    const result = ComicRepository.getAllComics(queryObject);
    return result;
  }

  static updateComicInfo(comicId: string, payload: IUpdateComic) {
    const result = ComicRepository.updateComicInfo(comicId, payload);
    return result;
  }

  static deleteComicInfo(comicId: string) {
    const result = ComicRepository.deleteComicInfo(comicId);
    return result;
  }

  static async deleteManyComics(){
    client.del('fetch-comics');
    await ComicRepository.deleteManyComics();
  }

}

export default ComicService;