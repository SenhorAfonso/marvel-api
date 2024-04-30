import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import CreatorService from '../services/creator_service';

class CreatorController {

  static async fetchCreators(
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'Creators successfully fetched from API!';
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

  static async getSingleCreator(
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'Single creator retrieved!';
    const status: number = StatusCodes.OK;

    const { creatorID } = req.params;
    const { result } = await CreatorService.getSingleCreator(creatorID);
    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async addCreator(
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'New creator added!';
    const status: number = StatusCodes.OK;

    const { name, role, sagaComic, otherComics } = req.body;
    const { result } = await CreatorService.addCreator({ name, role, sagaComic, otherComics });
    res.status(status).json({ code: status, success, message, data: { result } });

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

  static async resetCreators(
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'The creators were reseted!';
    const status: number = StatusCodes.OK;

    await CreatorService.deleteManyCreators();
    const { result } = await CreatorService.fetchCreators();

    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getByCollectionSize(
    req: Request,
    res: Response
  ) {
    const { collSize } = req.query;
    const success: boolean = true;
    const message: string = `Creators with collection greater than ${collSize} comics were retrieved!`;
    const status: number = StatusCodes.OK;

    const { result } = await CreatorService.getByCollectionSize(Number(collSize));
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getByNameLength(
    req: Request,
    res: Response
  ) {
    const { nameLength } = req.query;
    const success: boolean = true;
    const message: string = `Creators with name length greater than ${nameLength} characters were retrieved!`;
    const status: number = StatusCodes.OK;

    const { result } = await CreatorService.getByNameLength(Number(nameLength));
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

}

export default CreatorController;