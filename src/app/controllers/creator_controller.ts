import { Request, Response } from 'express';
import CreatorService from '../services/creator_service';

class CreatorController {

  static async fetchCreators(
    req: Request,
    res: Response
  ) {
    const result = await CreatorService.fetchCreators();
    res.send(result);
  }

  static async getCreators(
    req: Request,
    res: Response
  ) {
    const { success, message, status, result } = await CreatorService.getCreators();
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
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