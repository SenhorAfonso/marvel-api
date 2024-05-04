import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import ComicService from '../services/comic_service';

class ComicController {
  static async fetchComics(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Comic']
     * #swagger.description = 'Endpoint to fetch comics from the API.'
     * #swagger.responses[201] = {
     *  description: 'Comics successfully fetched from API!',
     * content: {
     *  "application/json": {
     *   schema: {
     *   $ref: "#/components/schemas/Comic"
     *   }
     * }
     * }
     * }
     * #swagger.responses[500] = {
     * description: 'Server Error'
     * }
     */

    const message: string = 'Comics successfully fetched from API!';
    const status: number = StatusCodes.CREATED;
    const success: boolean = true;

    const { result } = await ComicService.fetchComics();
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getAllComics(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Comic']
     * #swagger.description = 'Endpoint to get all comics.'
     * #swagger.parameters['getAllComics'] = {
     *  in: 'query',
     *  description: 'Query to filter comics',
     *  required: false,
     *  schema: { $ref: "#/components/schemas/ComicQuery" }
     * }
     * #swagger.responses[200] = {
     *  description: 'All comics were retrieved!',
     * content: {
     *  "application/json": {
     *   schema: {
     *   $ref: "#/components/schemas/Comic"
     *   }
     * }
     * }
     * }
     * #swagger.responses[500] = {
     * description: 'Server Error'
     * }
     */
    const message: string = 'All comics were retrieved!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const { result } = await ComicService.getAllComics(req.query);
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getSingleComic(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Comic']
     * #swagger.description = 'Endpoint to get a single comic.'
     * #swagger.parameters['comicId'] = { description: 'Comic ID', required: true }
     * #swagger.responses[200] = {
     *  description: 'Single comic retrieved!',
     * content: {
     *  "application/json": {
     *   schema: {
     *   $ref: "#/components/schemas/Comic"
     *   }
     * }
     * }
     * }
     * #swagger.responses[500] = {
     * description: 'Server Error'
     * }
     */

    const success: boolean = true;
    const message: string = 'Single comic retrieved!';
    const status: number = StatusCodes.OK;

    const { comicId } = req.params;
    const { result } = await ComicService.getSingleComic(comicId);
    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async addComic(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Comic']
     * #swagger.description = 'Endpoint to add a new comic.'
     * #swagger.parameters['addComic'] = {
     *  in: 'body',
     *  description: 'Comic object containing title, description, publishDate, and folder',
     *  required: true,
     *  schema: { $ref: "#/components/schemas/Comic" }
     * }
     * #swagger.responses[200] = {
     *  description: 'New Comic added!',
     * content: {
     *  "application/json": {
     *   schema: {
     *   $ref: "#/components/schemas/Comic"
     *   }
     * }
     * }
     * }
     * #swagger.responses[500] = {
     * description: 'Server Error'
     * }
     */

    const message: string = 'New Comic added!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const { title, description, publishDate, folder } = req.body;
    const { result } = await ComicService.addComic({ title, description, publishDate, folder });
    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async updateComicInfo(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Comic']
     * #swagger.description = 'Endpoint to update a comic.'
     * #swagger.parameters['comicId'] = { description: 'Comic ID', required: true }
     * #swagger.parameters['updateComic'] = {
     *  in: 'body',
     *  description: 'Comic object containing title, description, publishDate, and folder',
     *  required: true,
     *  schema: { $ref: "#/components/schemas/Comic" }
     * }
     * #swagger.responses[200] = {
     *  description: 'The Comic were updated!',
     * content: {
     *  "application/json": {
     *   schema: {
     *   $ref: "#/components/schemas/Comic"
     *   }
     * }
     * }
     * }
     * #swagger.responses[500] = {
     * description: 'Server Error'
     * }
     */

    const message: string = 'The Comic were updated!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const { comicId } = req.params;
    const { title, description, publishDate, folder } = req.body;
    const { result } = await ComicService.updateComicInfo(comicId, { title, description, publishDate, folder });

    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async deleteComicInfo(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Comic']
     * #swagger.description = 'Endpoint to delete a comic.'
     * #swagger.parameters['comicId'] = { description: 'Comic ID', required: true }
     * #swagger.responses[200] = {
     *  description: 'Comic successfully deleted!',
     * content: {
     *  "application/json": {
     *   schema: {
     *   $ref: "#/components/schemas/Comic"
     *   }
     * }
     * }
     * }
     * #swagger.responses[500] = {
     * description: 'Server Error'
     * }
     */

    const message: string = 'Comic successfully deleted!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const { comicId } = req.params;
    const { result } = await ComicService.deleteComicInfo(comicId);

    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async resetComics(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Comic']
     * #swagger.description = 'Endpoint to reset comics.'
     * #swagger.responses[200] = {
     *  description: 'Comics successfully reseted!',
     * content: {
     *  "application/json": {
     *   schema: {
     *   $ref: "#/components/schemas/Comic"
     *   }
     * }
     * }
     * }
     * #swagger.responses[500] = {
     * description: 'Server Error'
     * }
     */

    const message: string = 'Comics successfully reseted!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    await ComicService.deleteManyComics();
    const { result } = await ComicService.fetchComics();
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  static async getByPageCount(req: Request, res: Response) {
    /*
     * #swagger.tags = ['Comic']
     * #swagger.description = 'Endpoint to get comics by number of pages.'
     * #swagger.parameters['numPages'] = { description: 'Number of pages', required: true }
     * #swagger.responses[200] = {
     *  description: 'Comics with number of pages greater than numPages were retrieved!',
     * content: {
     *  "application/json": {
     *   schema: {
     *   $ref: "#/components/schemas/Comic"
     *   }
     * }
     * }
     * }
     * #swagger.responses[500] = {
     * description: 'Server Error'
     * }
     */
    
    const { numPages } = req.query;
    const message: string = `Comics with number of pages greater than ${numPages} were retrieved!`;
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const { result } = await ComicService.getByPageCount(Number(numPages));
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }
}

export default ComicController;
