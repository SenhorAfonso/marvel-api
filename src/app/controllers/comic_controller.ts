import { Request, Response } from 'express';
import ComicService from '../services/comic_service';

class ComicController {

  static addNewComic(
    req: Request,
    res: Response
  ) {
    const result = ComicService.addNewComic();
    res.send(result);
  }

  static  getAllComics(
    req: Request,
    res: Response
  ) {
    const result = ComicService.getAllComics();
    res.send(result);
  }

  static  updateComicInfo(
    req: Request,
    res: Response
  ) {
    const result = ComicService.updateComicInfo();
    res.send(result);
  }

  static  deleteComicInfo(
    req: Request,
    res: Response
  ) {
    const result = ComicService.deleteComicInfo();
    res.send(result);
  }
}

export default ComicController;