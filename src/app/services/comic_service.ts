import ComicReposity from '../repositories/comic_repository';
import ICreate_comic from '../../interfaces/comic/ICreate_comic';
import IUpdate_comic from '../../interfaces/comic/IUpdate_comic';

class ComicService {

  static async addNewComic(payload: ICreate_comic) {
    const result = await ComicReposity.addNewComic(payload);
    return result;
  }

  static getAllComics() {
    const result = ComicReposity.getAllComics();
    return result;
  }

  static updateComicInfo(comicId: string, payload: IUpdate_comic) {
    const result = ComicReposity.updateComicInfo(comicId, payload);
    return result;
  }

  static deleteComicInfo() {
    const result = ComicReposity.deleteComicInfo();
    return result;
  }

}

export default ComicService;