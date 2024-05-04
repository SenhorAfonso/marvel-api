import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import CreatorService from '../services/creator_service';

class CreatorController {
  static async fetchCreators(req: Request, res: Response) {
    /*
     *#swagger.tags = ['Creators']
     *#swagger.description = 'Endpoint to fetch creators from API.'
     *#swagger.security = [{JWT: []}]
     *#swagger.responses[201] = {
     *description: 'Creators successfully fetched from API!',
     *content: {
     *"application/json": {
     *schema: {
     *  "$ref": "#/components/schemas/Creator"
     *}
     *}
     *}
     *}
     *#swagger.responses[400] = {
     *  description: 'Error fetching creators from API!'
     *}
     * #swagger.responses[401] = {
     * description: 'Unauthorized'
     * }
     * #swagger.responses[404] = {
     * description: 'Not Found'
     * }
     * #swagger.responses[500] = {
     * description: 'Server Error'
     * }
     *
     */

    const success: boolean = true;
    const message: string = 'Creators successfully fetched from API!';
    const status: number = StatusCodes.OK;

    const { result } = await CreatorService.fetchCreators();
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getCreators(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Creators']
     * #swagger.description = 'Endpoint to fetch creators from API.'
     * #swagger.responses[200] = {
     *   description: 'All creators were retrieved!',
     *   content: {
     *     "application/json": {
     *       schema: {
     *         $ref: "#/components/schemas/Creator"
     *       }
     *     }
     *   }
     * }
     * #swagger.responses[400] = {
     *   description: 'Error fetching creators from API!'
     * }
     * #swagger.responses[401] = {
     *   description: 'Unauthorized'
     * }
     * #swagger.responses[404] = {
     *   description: 'Not Found'
     * }
     * #swagger.responses[500] = {
     *   description: 'Server Error'
     * }
     */
    const success: boolean = true;
    const message: string = 'All creators were retrieved!';
    const status: number = StatusCodes.OK;

    const { result } = await CreatorService.getCreators(req.body);
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getSingleCreator(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Creators']
     * #swagger.description = 'Endpoint to fetch a single creator by ID.'
     * #swagger.parameters['creatorID'] = {
     *   in: 'path',
     *   description: 'ID of the creator to retrieve',
     *   required: true,
     *   type: 'string'
     * }
     * #swagger.responses[200] = {
     *   description: 'Single creator retrieved!',
     *   content: {
     *     "application/json": {
     *       schema: {
     *         $ref: "#/components/schemas/Creator"
     *       }
     *     }
     *   }
     * }
     * #swagger.responses[400] = {
     *   description: 'Error retrieving creator'
     * }
     * #swagger.responses[404] = {
     *   description: 'Creator not found'
     * }
     * #swagger.responses[500] = {
     *   description: 'Server Error'
     * }
     */
    const success: boolean = true;
    const message: string = 'Single creator retrieved!';
    const status: number = StatusCodes.OK;

    const { creatorID } = req.params;
    const { result } = await CreatorService.getSingleCreator(creatorID);
    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async addCreator(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Creators']
     * #swagger.description = 'Endpoint to add a new creator.'
     * #swagger.parameters['newCreator'] = {
     *   in: 'body',
     *   description: 'Creator object containing name, role, sagaComic, and otherComics',
     *   required: true,
     *   schema: { $ref: "#/components/schemas/CreatorInput" }
     * }
     * #swagger.responses[200] = {
     *   description: 'New creator added!',
     *   content: {
     *     "application/json": {
     *       schema: {
     *         $ref: "#/components/schemas/Creator"
     *       }
     *     }
     *   }
     * }
     * #swagger.responses[400] = {
     *   description: 'Error adding creator'
     * }
     * #swagger.responses[500] = {
     *   description: 'Server Error'
     * }
     */
    const success: boolean = true;
    const message: string = 'New creator added!';
    const status: number = StatusCodes.OK;

    const { name, role, sagaComic, otherComics } = req.body;
    const { result } = await CreatorService.addCreator({ name, role, sagaComic, otherComics });
    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async updateCreator(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Creators']
     * #swagger.description = 'Endpoint to update a creator by ID.'
     * #swagger.parameters['creatorID'] = {
     *   in: 'path',
     *   description: 'ID of the creator to update',
     *   required: true,
     *   type: 'string'
     * }
     * #swagger.parameters['updatedCreator'] = {
     *   in: 'body',
     *   description: 'Updated creator object containing name, role, sagaComic, and otherComics',
     *   required: true,
     *   schema: { $ref: "#/components/schemas/CreatorInput" }
     * }
     * #swagger.responses[200] = {
     *   description: 'The creator was updated!',
     *   content: {
     *     "application/json": {
     *       schema: {
     *         $ref: "#/components/schemas/Creator"
     *       }
     *     }
     *   }
     * }
     * #swagger.responses[400] = {
     *   description: 'Error updating creator'
     * }
     * #swagger.responses[404] = {
     *   description: 'Creator not found'
     * }
     * #swagger.responses[500] = {
     *   description: 'Server Error'
     * }
     */
    const success: boolean = true;
    const message: string = 'The creator were updated!';
    const status: number = StatusCodes.OK;

    const { creatorID } = req.params;
    const { name, role, sagaComic, otherComics } = req.body;
    const { result } = await CreatorService.updateCreator({ creatorID, name, role, sagaComic, otherComics });
    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async deleteCreator(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Creators']
     * #swagger.description = 'Endpoint to delete a creator by ID.'
     * #swagger.parameters['creatorID'] = {
     *   in: 'path',
     *   description: 'ID of the creator to delete',
     *   required: true,
     *   type: 'string'
     * }
     * #swagger.responses[200] = {
     *   description: 'Creator deleted!',
     * }
     * #swagger.responses[400] = {
     *   description: 'Error deleting creator'
     * }
     * #swagger.responses[404] = {
     *   description: 'Creator not found'
     * }
     * #swagger.responses[500] = {
     *   description: 'Server Error'
     * }
     */
    const success: boolean = true;
    const message: string = 'Creator deleted';
    const status: number = StatusCodes.OK;

    const { creatorID } = req.params;
    const { result } = await CreatorService.deleteCreator(creatorID);

    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async resetCreators(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Creators']
     * #swagger.description = 'Endpoint to reset creators.'
     * #swagger.responses[200] = {
     *   description: 'The creators were reset!'
     * }
     * #swagger.responses[500] = {
     *   description: 'Server Error'
     * }
     */
    const success: boolean = true;
    const message: string = 'The creators were reseted!';
    const status: number = StatusCodes.OK;

    await CreatorService.deleteManyCreators();
    const { result } = await CreatorService.fetchCreators();

    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getByCollectionSize(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Creators']
     * #swagger.description = 'Endpoint to fetch creators by collection size.'
     * #swagger.parameters['collSize'] = {
     *   in: 'query',
     *   description: 'Minimum size of the collection',
     *   required: true,
     *   type: 'integer'
     * }
     * #swagger.responses[200] = {
     *   description: 'Creators with collection size greater than specified were retrieved!'
     * }
     * #swagger.responses[400] = {
     *   description: 'Bad Request'
     * }
     * #swagger.responses[500] = {
     *   description: 'Server Error'
     * }
     */
    const { collSize } = req.query;
    const success: boolean = true;
    const message: string = `Creators with collection greater than ${collSize} comics were retrieved!`;
    const status: number = StatusCodes.OK;

    const { result } = await CreatorService.getByCollectionSize(Number(collSize));
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getByNameLength(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Creators']
     * #swagger.description = 'Endpoint to fetch creators by name length.'
     * #swagger.parameters['nameLength'] = {
     *   in: 'query',
     *   description: 'Minimum length of the creator name',
     *   required: true,
     *   type: 'integer'
     * }
     * #swagger.responses[200] = {
     *   description: 'Creators with name length greater than specified were retrieved!'
     * }
     * #swagger.responses[400] = {
     *   description: 'Bad Request'
     * }
     * #swagger.responses[500] = {
     *   description: 'Server Error'
     * }
     */
    const { nameLength } = req.query;
    const success: boolean = true;
    const message: string = `Creators with name length greater than ${nameLength} characters were retrieved!`;
    const status: number = StatusCodes.OK;

    const { result } = await CreatorService.getByNameLength(Number(nameLength));
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }
}

export default CreatorController;
