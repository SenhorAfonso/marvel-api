import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import CreatorService from '../services/creator_service';

class CreatorController {

  static async fetchCreators(
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'The creators were registered!';
    const status: number = StatusCodes.OK;

    const { result } = await CreatorService.fetchCreators();
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getCreators(
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'All creators were retrieved!';
    const status: number = StatusCodes.OK;

    const { result } = await CreatorService.getCreators(req.body);
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async updateCreator(
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'The creator were updated!';
    const status: number = StatusCodes.OK;

    const { creatorID } = req.params;
    const { name, role, sagaComic, otherComics } = req.body;
    const { result } = await CreatorService.updateCreator({ creatorID, name, role, sagaComic, otherComics });
    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async deleteCreator(
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'Creator deleted';
    const status: number = StatusCodes.OK;

    const { creatorID } = req.params;
    const { result } = await CreatorService.deleteCreator(creatorID);

    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async reseteCreators(
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'The creators were reseted!';
    const status: number = StatusCodes.OK;

    await CreatorService.deleteManyCreators();
    const { result } = await CreatorService.fetchCreators();

    res.status(status).json({ success, message, data: { result, available: result.length } });
  }

}

export default CreatorController;