import { Request, Response } from 'express';
import CreatorService from '../services/creator_service';

class CreatorController {

  static fetchCreators(
    req: Request,
    res: Response
  ) {
    const result = CreatorService.fetchCreators();
    res.send(result);
  }

  static getCreators(
    req: Request,
    res: Response
  ) {
    const result = CreatorService.getCreators();
    res.send(result);
  }

  static updateCreator(
    req: Request,
    res: Response
  ) {
    const result = CreatorService.updateCreator();
    res.send(result);
  }

  static deleteCreator(
    req: Request,
    res: Response
  ) {
    const result = CreatorService.deleteCreator();
    res.send(result);
  }

}

export default CreatorController;