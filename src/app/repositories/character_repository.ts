/* eslint-disable no-return-await */
import { Model } from 'mongoose';
import { ICharacter } from '../../interfaces/character/ICharacter';
import { ICharacterRepository } from '../../interfaces/character/ICharacterRepository';
import character from '../models/character_schema';

export default class CharacterRepository implements ICharacterRepository<ICharacter> {
  private readonly characterModel: Model<ICharacter>;

  constructor() {
    this.characterModel = character;
  }

  async create(character: ICharacter): Promise<ICharacter> {
    return await this.characterModel.create(character);
  }

  async findAll(): Promise<ICharacter[] | null> {
    return await this.characterModel.find();
  }

  async updateById(comicId: string, character: ICharacter): Promise<ICharacter | null> {
    return await this.characterModel.findByIdAndUpdate(comicId, character, { new: true });
  }

  async deleteById(id: string): Promise<void> {
    await this.characterModel.findByIdAndDelete(id);
  }
}
