import ComicReposity from '../repositories/comic_repository';
import ICreateNewComic from '../../interfaces/comic/ICreateNewComic';

class ComicService {

  static async addNewComic(payload: ICreateNewComic) {
    const result = await ComicReposity.addNewComic(payload);
    return result;
  }

  static getAllComics() {
    const result = ComicReposity.getAllComics();
    return result;
  }

  static updateComicInfo() {
    const result = ComicReposity.updateComicInfo();
    return result;
  }

  static deleteComicInfo() {
    const result = ComicReposity.deleteComicInfo();
    return result;
  }

}

export default ComicService;