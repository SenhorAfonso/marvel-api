import { Request, Response } from 'express';

class ComicController {

  static addNewComic(
    req: Request,
    res: Response
  ) {
    res.send('Creating new comic');
  }

  static getAllComics(
    req: Request,
    res: Response
  ) {
    res.send('Getting all comics');
  }

  static updateComicInfo(
    req: Request,
    res: Response
  ) {
    res.send('Updating comic info');
  }

  static deleteComicInfo(
    req: Request,
    res: Response
  ) {
    res.send('Deleting comic info');
  }
}

export default ComicController;