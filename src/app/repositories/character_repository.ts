/* eslint-disable new-cap */
/* eslint-disable no-return-await */
import { Model } from 'mongoose';
import { ICharacter } from '../../interfaces/character/ICharacter';
import { ICharacterRepository } from '../../interfaces/character/ICharacterRepository';
import model from '../models/character_schema';

export default class CharacterRepository implements ICharacterRepository<ICharacter> {
  private readonly characterModel: Model<ICharacter>;

  constructor() {
    this.characterModel = model;
  }

  async create(character: ICharacter[] | ICharacter): Promise<ICharacter> {
    return await this.characterModel.create(character);
  }

  async findAll(): Promise<ICharacter[] | null> {
    return await this.characterModel.find();
  }

  async updateById(id: string, character: ICharacter): Promise<ICharacter | null> {
    return await this.characterModel.findByIdAndUpdate(id, character, { new: true });
  }

  async deleteById(id: string): Promise<void> {
    await this.characterModel.findByIdAndDelete(id);
  }
}
