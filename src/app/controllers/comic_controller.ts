import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import ComicService from '../services/comic_service';

class ComicController {

  static async fetchComics(
    req: Request,
    res: Response
  ) {
    const message: string = 'Comics successfully fetched from API!';
    const status: number = StatusCodes.CREATED;
    const success: boolean = true;

    const { result } = await ComicService.fetchComics();
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getAllComics(
    req: Request,
    res: Response
  ) {
    const message: string = 'All comics were retrieved!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const { result } = await ComicService.getAllComics(req.query);
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getSingleComic(
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'Single comic retrieved!';
    const status: number = StatusCodes.OK;

    const { comicId } = req.params;
    const { result } = await ComicService.getSingleComic(comicId);
    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async addComic(
    req: Request,
    res: Response
  ) {
    const message: string = 'New Comic added!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const { title, description, publishDate, folder } = req.body;
    const { result } = await ComicService.addComic({ title, description, publishDate, folder });
    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async updateComicInfo(
    req: Request,
    res: Response
  ) {
    const message: string = 'The Comic were updated!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const { comicId } = req.params;
    const { title, description, publishDate, folder } = req.body;
    const { result } = await ComicService.updateComicInfo(comicId, { title, description, publishDate, folder });

    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async deleteComicInfo(
    req: Request,
    res: Response
  ) {
    const message: string = 'Comic successfully deleted!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const { comicId } = req.params;
    const { result } = await ComicService.deleteComicInfo(comicId);

    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async resetComics(
    req: Request,
    res: Response
  ) {
    const message: string = 'Comics successfully reseted!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    await ComicService.deleteManyComics();
    const { result } = await ComicService.fetchComics();
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getByPageCount(
    req: Request,
    res: Response
  ) {
    const { numPages } = req.query;
    const message: string = `Comics with number of pages greater than ${numPages} were retrieved!`;
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const result = await ComicService.getByPageCount(Number(numPages));
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }
}

export default ComicController;