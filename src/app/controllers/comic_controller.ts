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

  static async getAllComics(
    req: Request,
    res: Response
  ) {
    const { success, status, message, result } = await ComicService.getAllComics();
    res.status(status).json({ success, message, data: result });
  }

  static async updateComicInfo(
    req: Request,
    res: Response
  ) {
    const { comicId } = req.params;
    const { title, description, publishDate, folder } = req.body;
    const { success, status, message, result } = await ComicService.updateComicInfo(comicId, { title, description, publishDate, folder });

    res.status(status).json({ success, message, data: result });
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