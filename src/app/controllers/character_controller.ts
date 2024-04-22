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
      await this.characterService.fetchComicData();

      response.status(StatusCodes.CREATED).json({ message: 'Successful operation!' });
    } catch (error: any) {
      response.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }

  async create(request: Request, response: Response) {
    const createCharacterDTO: ICharacterDTO = request.body;

    try {
      const result = await this.characterService.create(createCharacterDTO);

      response.status(StatusCodes.CREATED).json({ message: 'Successful operation!', result });
    } catch (error: any) {
      response.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }

  async findAll(request: Request, response: Response) {
    try {
      const search = await this.characterService.findAll();

      response.status(StatusCodes.OK).json(search);
    } catch (error: any) {
      response.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }

  async updateById(request: Request, response: Response) {
    const { characterId } = request.params;
    const updateCharacter: ICharacterDTO = request.body;
    try {
      await this.characterService.updateById(characterId, updateCharacter);

      response.status(StatusCodes.OK).json({ message: 'Successful operation!' });
    } catch (error: any) {
      response.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }

  async deleteById(request: Request, response: Response) {
    const { characterId } = request.params;
    try {
      await this.characterService.deleteById(characterId);

      response.status(StatusCodes.NO_CONTENT).json();
    } catch (error: any) {
      response.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }
}
