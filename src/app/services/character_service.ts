/* eslint-disable no-return-await */
import { ICharacterDTO } from '../../DTOs/character/ICharacterDTO';
import { ICharacter } from '../../interfaces/character/ICharacter';
import CharacterAdapter from '../adapter/character/characterAdapter';
import CharacterRepository from '../repositories/character_repository';

export default class CharacterService {
  private readonly characterRepository: CharacterRepository;
  private readonly characterAdapter: CharacterAdapter;

  constructor(characterRepository: CharacterRepository) {
    this.characterRepository = characterRepository;
    this.characterAdapter = new CharacterAdapter();
  }

  async create(character: ICharacterDTO): Promise<ICharacter> {
    const characterEntity = this.characterAdapter.toEntity(character);
    return await this.characterRepository.create(characterEntity);
  }

  async findAll(): Promise<ICharacter[] | null> {
    return await this.characterRepository.findAll();
  }

  async updateById(id: string, character: ICharacterDTO): Promise<ICharacter | null> {
    const characterEntity = this.characterAdapter.toEntity(character);
    return await this.characterRepository.updateById(id, characterEntity);
  }

  async deleteById(id: string): Promise<void> {
    await this.characterRepository.deleteById(id);
  }
}
