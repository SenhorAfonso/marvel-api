import { Request, Response } from 'express';
import ComicService from '../services/comic_service';

class ComicController {

  static async fetchComics(
    req: Request,
    res: Response
  ) {
    const { success, status, message, result } = await ComicService.fetchComics();
    res.status(status).json({ success, message, data: result });
  }

  static async getAllComics(
    req: Request,
    res: Response
  ) {
    const { success, status, message, result } = await ComicService.getAllComics(req.query);
    res.status(status).json({ success, message, data: { result, available: result.length } });
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

  static async deleteComicInfo(
    req: Request,
    res: Response
  ) {
    const { comicId } = req.params;
    const { success, status, message, result } = await ComicService.deleteComicInfo(comicId);

    res.status(status).json({ success, message, result });
  }
}

export default ComicController;