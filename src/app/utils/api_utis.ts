import serverConfig from '../../configs/serverConfig';
import IComicResponseBody from '../../interfaces/comic/IComicResponseBody';

class APIUtils {

  static getComic(comics: IComicResponseBody) {
    const comic = {
      title: comics.title,
      description: comics.description,
      publishDate: comics.dates[0].date,
      folder: comics.thumbnail.path + serverConfig.IMAGE_QUALITY + serverConfig.IMAGE_QUALITY
    };

    return comic;
  }
}

export default APIUtils;