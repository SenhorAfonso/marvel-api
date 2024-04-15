import ComicReposity from '../repositories/comic_repository';

class ComicService {

  static addNewComic() {
    const result = ComicReposity.addNewComic();
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