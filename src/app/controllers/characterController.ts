import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CharacterService from '../services/characterService';
import { ICharacterDTO } from '../../DTOs/character/ICharacterDTO';

export default class CharacterController {
  private readonly characterService: CharacterService;

  constructor() {
    this.characterService = new CharacterService();
  }

  async fetchData(request: Request, response: Response): Promise<void> {
    const message: string = 'Characters successfully fetched from API!';
    const status: number = StatusCodes.CREATED;
    const success: boolean = true;

    await this.characterService.fetchCharacters();
    response.status(status).json({ code: status, success, message });
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
    const result = await this.characterService.create(createCharacterDTO);
    response.status(status).json({ code: status, success, message, data: { result } });
  }

  async findAll(request: Request, response: Response) {
    const message: string = 'All characters were retrieved!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const search = await this.characterService.findAll();
    response.status(status).json({ code: status, success, message, data: { result: search } });
  }

  async updateById(request: Request, response: Response) {
    const message: string = 'The character were updated!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const { characterId } = request.params;
    const updateCharacter: ICharacterDTO = request.body;

    await this.characterService.updateById(characterId, updateCharacter);
    response.status(status).json({ code: status, success, message });
  }

  async deleteById(request: Request, response: Response) {
    const message: string = 'The character were deleted!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const { characterId } = request.params;

    await this.characterService.deleteById(characterId);
    response.status(status).json({ code: status, success, message });
  }

  async resetCharacters(request: Request, response: Response) {
    const message: string = 'Characters successfully reseted!';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    await this.characterService.deleteManyCharacters();
    await this.characterService.fetchCharacters();
    response.status(status).json({ code: status, success, message });
  }

  async getByComicCount(req: Request, res: Response) {
    const { comicCount } = req.query;
    const message: string = `Characters that starred in more than ${comicCount} comics were retrived!`;
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const result = await this.characterService.getByComicCount(Number(comicCount));
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }

  async getWithSecondTitle(req: Request, res: Response) {
    const message: string = 'Characters that hava a second title were retrieved';
    const status: number = StatusCodes.OK;
    const success: boolean = true;

    const result = await this.characterService.getWithSecondTitle();
    res.status(status).json({ code: status, success, message, data: { result, available: result.length } });
  }
}
