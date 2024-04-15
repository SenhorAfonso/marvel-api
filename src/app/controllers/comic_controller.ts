import { Request, Response } from 'express';
import ComicService from '../services/comic_service';

class ComicController {

  static async addNewComic(
    req: Request,
    res: Response
  ) {
    const { title, description, publishDate, folder } = req.body;
    const { success, status, message, result } = await ComicService.addNewComic({ title, description, publishDate, folder });

    res.status(status).json({ success, message, data: result });
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