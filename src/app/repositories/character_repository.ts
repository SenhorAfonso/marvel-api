/* eslint-disable new-cap */
/* eslint-disable no-return-await */
import { Model } from 'mongoose';
import { ICharacter } from '../../interfaces/character/ICharacter';
import { ICharacterRepository } from '../../interfaces/character/ICharacterRepository';
import model from '../models/charactersModel';

export default class CharacterRepository implements ICharacterRepository<ICharacter> {
  private characterModel: Model<ICharacter>;

  constructor() {
    this.characterModel = model;
  }

  async save(character: ICharacter[]) {
    const result = await this.characterModel.create(character);
    return result;
  }

  async create(character: ICharacter): Promise<ICharacter> {
    const result = await this.characterModel.create(character);
    return result;
  }

  async findAll(): Promise<ICharacter[] | null> {
    return await this.characterModel.find();
  }

  async getSinglecharacter(id: string) {
    return await this.characterModel.find({ _id: id });
  }

  async updateById(id: string, character: ICharacter): Promise<ICharacter | null> {
    return await this.characterModel.findByIdAndUpdate(id, character, { new: true });
  }

  async deleteById(id: string): Promise<void> {
    await this.characterModel.findByIdAndDelete(id);
  }

  async deleteManyCharacters() {
    await this.characterModel.deleteMany({});
  }
}
