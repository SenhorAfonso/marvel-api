import mongoose from 'mongoose';
import ComicRepository from '../repositories/comic_repository';
import IUpdateComic from '../../interfaces/comic/IUpdate_comic';
import serverConfig from '../../configs/serverConfig';
import APIUtils from '../utils/api_utis';
import IComicModel from '../../interfaces/comic/IComic_model';

class ComicService {

  static async fetchComics(): Promise<{
    message: string;
    status: number;
    success: boolean;
    result: mongoose.Document[]
  }> {
    const comicsRequest = await fetch(`https:// gateway.marvel.com/v1/public/comics?title=Secret%20Wars${serverConfig.MARVEL_API_AUTH}`);
    const comicsResponseBody = await comicsRequest.json();

    const comicsArray: IComicModel[] = comicsResponseBody.data.results;
    const filteredComicsArray: IComicModel[] = [];

    comicsArray.forEach(registro => {
      const comic = APIUtils.getComic(registro);
      filteredComicsArray.push(comic);
    });

    const result = await ComicRepository.saveComics(filteredComicsArray);
    return result;
  }

  static getAllComics() {
    const result = ComicRepository.getAllComics();
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

}

export default ComicService;