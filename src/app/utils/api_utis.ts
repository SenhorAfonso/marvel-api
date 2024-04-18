import serverConfig from '../../configs/serverConfig';

class APIUtils {

  static getComic(comics: any) {
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