import { Request, Response } from 'express';
import CreatorService from '../services/creator_service';

class CreatorController {

  static async fetchCreators(
    req: Request,
    res: Response
  ) {
    const { success, message, status, result } = await CreatorService.fetchCreators();
    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async getCreators(
    req: Request,
    res: Response
  ) {
    const { success, message, status, result } = await CreatorService.getCreators();
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async updateCreator(
    req: Request,
    res: Response
  ) {
    const { creatorID } = req.params;
    const { name, role, sagaComic, otherComics } = req.body;
    const { success, message, status, result } = await CreatorService.updateCreator({ creatorID, name, role, sagaComic, otherComics });
    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async deleteCreator(
    req: Request,
    res: Response
  ) {
    const { creatorID } = req.params;
    const { success, message, status, result } = await CreatorService.deleteCreator(creatorID);

    res.status(status).json({ code: status, success, message, data: { result } });
  }

}

export default CreatorController;