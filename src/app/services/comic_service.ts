import mongoose from 'mongoose';
import ComicRepository from '../repositories/comic_repository';
import IUpdate_comic from '../../interfaces/comic/IUpdate_comic';
import serverConfig from '../../configs/serverConfig';
import APIUtils from '../utils/api_utis';
import IComic_model from '../../interfaces/comic/IComic_model';

class ComicService {

  static async fetchComics(): Promise<{
    message: string;
    status: number;
    success: boolean;
    result: mongoose.Document[]
  }> {
    const comics_request = await fetch(`http://gateway.marvel.com/v1/public/comics${serverConfig.MARVEL_API_AUTH}`);
    const comics_response_body = await comics_request.json();

    const comics_array: IComic_model[] = comics_response_body.data.results;
    const filtered_comics_array: IComic_model[] = [];

    comics_array.forEach(registro => {
      const comic = APIUtils.getComic(registro);
      filtered_comics_array.push(comic);
    });

    const result = await ComicRepository.saveComics(filtered_comics_array);
    return result;
  }

  static getAllComics() {
    const result = ComicRepository.getAllComics();
    return result;
  }

  static updateComicInfo(comicId: string, payload: IUpdate_comic) {
    const result = ComicRepository.updateComicInfo(comicId, payload);
    return result;
  }

  static deleteComicInfo(comicId: string) {
    const result = ComicRepository.deleteComicInfo(comicId);
    return result;
  }

}

export default ComicService;