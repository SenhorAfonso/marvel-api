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
    const success: boolean = true;
    const message: string = 'Single character retrieved!';
    const status: number = StatusCodes.OK;

    const { characterId } = request.params;
    const result = await this.characterService.getSinglecharacter(characterId);
    response.status(status).json({ code: status, success, message, data: { result } });
  }

  async create(request: Request, response: Response) {
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
    const message: string = 'Characters successfully reseted!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    await this.characterService.deleteManyCharacters();
    await this.characterService.fetchComicData();
    response.status(status).json({ code: status, success, message });
  }
}
