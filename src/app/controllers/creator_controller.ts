import { Request, Response } from 'express';

class CreatorController {

  static fetchCreators(
    req: Request,
    res: Response
  ) {
    const result = 'Creating a new creator';
    res.send(result);
  }

  static getCreators(
    req: Request,
    res: Response
  ) {
    const result = 'Retrieving all creators';
    res.send(result);
  }

  static updateCreator(
    req: Request,
    res: Response
  ) {
    const result = 'Updating a creator';
    res.send(result);
  }

  static deleteCreator(
    req: Request,
    res: Response
  ) {
    const result = 'Deleting a creator';
    res.send(result);
  }

}

export default CreatorController;