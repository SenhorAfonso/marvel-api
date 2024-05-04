import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CharacterService from '../services/character_service';
import { ICharacterDTO } from '../../DTOs/character/ICharacterDTO';

export default class CharacterController {
  private readonly characterService: CharacterService;

  constructor() {
    this.characterService = new CharacterService();
  }

  async fetchData(request: Request, response: Response): Promise<void> {
    /*
     *#swagger.tags = ['Character']
     *#swagger.description = 'Endpoint to fetch characters from the Marvel API'
     *#swagger.security = [{JWT: []}]
     *#swagger.responses[201] = {
     *description: 'Characters successfully fetched from API!',
     *content: {
     *"application/json": {
     *schema: {
     *  "$ref": "#/components/schemas/Character"
     *}
     *}
     *}
     *}
     *#swagger.responses[400] = {
     *  description: 'Error fetching characters from API'
     *}
     *
     */

    try {
      const message: string = 'Characters successfully fetched from API!';
      const status: number = StatusCodes.CREATED;
      const success: boolean = true;

      await this.characterService.fetchComicData();
      response.status(status).json({ code: status, success, message });
    } catch (error: any) {
      response.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }

  async getSingle(request: Request, response: Response) {
    /*
     *#swagger.tags = ['Character']
     *#swagger.description = 'Endpoint to get a single character by ID'
     *#swagger.security = [{JWT: []}]
     *#swagger.parameters['characterId'] = {
     *  in: 'path',
     *  description: 'ID of the character to get',
     *  required: true,
     *  type: 'string'
     *}
     *#swagger.responses[200] = {
     *  description: 'Single character retrieved!',
     *  content: {
     *    "application/json": {
     *      schema: {
     *        "$ref": "#/components/schemas/Character"
     *      }
     *    }
     *  }
     *}
     *#swagger.responses[400] = {
     *  description: 'Error fetching character'
     *}
     *
     */
    const success: boolean = true;
    const message: string = 'Single character retrieved!';
    const status: number = StatusCodes.OK;

    const { characterId } = request.params;
    const result = await this.characterService.getSinglecharacter(characterId);
    response.status(status).json({ code: status, success, message, data: { result } });
  }

  async create(request: Request, response: Response) {
    /*
     *#swagger.tags = ['Character']
     *#swagger.description = 'Endpoint to create a new character'
     *#swagger.security = [{JWT: []}]
     *#swagger.parameters['createCharacter'] = {
     *  in: 'body',
     *  description: 'Character object to create',
     *  required: true,
     *  schema: { $ref: "#/components/schemas/Character" }
     *}
     *#swagger.responses[201] = {
     *  description: 'New character added!',
     *  content: {
     *    "application/json": {
     *      schema: {
     *        "$ref": "#/components/schemas/Character"
     *      }
     *    }
     *  }
     *}
     *#swagger.responses[400] = {
     *  description: 'Error creating character'
     *}
     *
     */
    const message: string = 'New character added!';
    const status: number = StatusCodes.CREATED;
    const success: boolean = true;

    const createCharacterDTO: ICharacterDTO = request.body;

    try {
      const result = await this.characterService.create(createCharacterDTO);

      response.status(status).json({ code: status, success, message, data: { result } });
    } catch (error: any) {
      response.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }

  async findAll(request: Request, response: Response) {
    /*
     *#swagger.tags = ['Character']
     *#swagger.description = 'Endpoint to get all characters'
     *#swagger.security = [{JWT: []}]
     *#swagger.responses[200] = {
     *  description: 'All characters were retrieved!',
     *  content: {
     *    "application/json": {
     *      schema: {
     *        "$ref": "#/components/schemas/Character"
     *      }
     *    }
     *  }
     *}
     *#swagger.responses[400] = {
     *  description: 'Error fetching characters'
     *}
     *
     */
    try {
      const message: string = 'All characters were retrieved!';
      const status: number = StatusCodes.OK;
      const success: boolean = true;

      const search = await this.characterService.findAll();

      response.status(status).json({ code: status, success, message, data: { result: search } });
    } catch (error: any) {
      response.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }

  async updateById(request: Request, response: Response) {
    /*
     *#swagger.tags = ['Character']
     *#swagger.description = 'Endpoint to update a character by ID'
     *#swagger.security = [{JWT: []}]
     *#swagger.parameters['characterId'] = {
     *  in: 'path',
     *  description: 'ID of the character to update',
     *  required: true,
     *  type: 'string'
     *}
     *#swagger.parameters['updateCharacter'] = {
     *  in: 'body',
     *  description: 'Character object to update',
     *  required: true,
     *  schema: { $ref: "#/components/schemas/Character" }
     *}
     *#swagger.responses[200] = {
     *  description: 'The character were updated!',
     *  content: {
     *    "application/json": {
     *      schema: {
     *        "$ref": "#/components/schemas/Character"
     *      }
     *    }
     *  }
     *}
     *#swagger.responses[400] = {
     *  description: 'Error updating character'
     *}
     *
     */

    const message: string = 'The character were updated!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const { characterId } = request.params;
    const updateCharacter: ICharacterDTO = request.body;
    try {
      await this.characterService.updateById(characterId, updateCharacter);

      response.status(status).json({ code: status, success, message });
    } catch (error: any) {
      response.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }

  async deleteById(request: Request, response: Response) {
    /*
     *#swagger.tags = ['Character']
     *#swagger.description = 'Endpoint to delete a character by ID'
     *#swagger.security = [{JWT: []}]
     *#swagger.parameters['characterId'] = {
     *  in: 'path',
     *  description: 'ID of the character to delete',
     *  required: true,
     *  type: 'string'
     *}
     *#swagger.responses[204] = {
     *  description: 'The character were deleted!'
     *}
     *#swagger.responses[400] = {
     *  description: 'Error deleting character'
     *}
     *
     */
    const message: string = 'The character were deleted!';
    const status: number = StatusCodes.NO_CONTENT;
    const success: boolean = true;
    const { characterId } = request.params;
    try {
      await this.characterService.deleteById(characterId);

      response.status(status).json({ code: status, success, message });
    } catch (error: any) {
      response.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }

  async resetCharacters(request: Request, response: Response) {
    /*
     *#swagger.tags = ['Character']
     *#swagger.description = 'Endpoint to reset characters'
     *#swagger.security = [{JWT: []}]
     *#swagger.responses[200] = {
     *  description: 'Characters successfully reseted!'
     *}
     *
     */
    const message: string = 'Characters successfully reseted!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    await this.characterService.deleteManyCharacters();
    await this.characterService.fetchComicData();
    response.status(status).json({ code: status, success, message });
  }

  async getByComicCount(req: Request, res: Response) {
    /*
     *#swagger.tags = ['Character']
     *#swagger.description = 'Endpoint to get characters by comic count'
     *#swagger.security = [{JWT: []}]
     *#swagger.parameters['comicCount'] = {
     *  in: 'query',
     *  description: 'Minimum number of comics the character must have starred in',
     *  required: true,
     *  type: 'number'
     *}
     *#swagger.responses[200] = {
     *  description: 'Characters that starred in more than {comicCount} comics were retrieved!',
     *  content: {
     *    "application/json": {
     *      schema: {
     *        "$ref": "#/components/schemas/Character"
     *      }
     *    }
     *  }
     *}
     *#swagger.responses[400] = {
     *  description: 'Error fetching characters by comic count'
     *}
     *
     */

    const { comicCount } = req.query;
    const message: string = `Characters that starred in more than ${comicCount} comics were retrived!`;
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const result = await this.characterService.getByComicCount(Number(comicCount));
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  async getWithSecondTitle(req: Request, res: Response) {
    /*
     *#swagger.tags = ['Character']
     *#swagger.description = 'Endpoint to get characters with a second title'
     *#swagger.security = [{JWT: []}]
     *#swagger.responses[200] = {
     *  description: 'Characters that hava a second title were retrieved',
     *  content: {
     *    "application/json": {
     *      schema: {
     *        "$ref": "#/components/schemas/Character"
     *      }
     *    }
     *  }
     *}
     *#swagger.responses[400] = {
     *  description: 'Error fetching characters with a second title'
     *}
     *
     */

    const message: string = 'Characters that hava a second title were retrieved';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const result = await this.characterService.getWithSecondTitle();
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }
}
