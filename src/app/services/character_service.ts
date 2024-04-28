/* eslint-disable no-return-await */
import serverConfig from '../../configs/serverConfig';
import { ICharacterDTO } from '../../DTOs/character/ICharacterDTO';
import { ICharacter } from '../../interfaces/character/ICharacter';
import ICharacterResponseBody from '../../interfaces/character/ICharacterResponseBody';
import IComicResponseBody from '../../interfaces/comic/IComicResponseBody';
import IHasResponseBody from '../../interfaces/generics/IHasResponseBody';
import CharacterAdapter from '../adapter/character/characterAdapter';
import CharacterRepository from '../repositories/character_repository';

export default class CharacterService {
  private readonly characterRepository: CharacterRepository;
  private readonly characterAdapter: CharacterAdapter;

  constructor() {
    this.characterRepository = new CharacterRepository();
    this.characterAdapter = new CharacterAdapter();
  }

  allCharacters: ICharacter[] = [];

  async fetchCharData(URL: string, comic: any) {
    try {
      const characterRequest = await fetch(`${URL}${serverConfig.MARVEL_API_AUTH}`);

      const response: IHasResponseBody<ICharacterResponseBody> = await characterRequest.json();
      const characterArr = response.data.results;
      const characterPerComicArr: ICharacter[] = [];

      characterArr.forEach((response) => {
        const character: ICharacter = {
          name: response.name,
          description: response.description,
          thumbnail: response.thumbnail.path + serverConfig.IMAGE_QUALITY + serverConfig.IMAGE_EXTENSION,
          comic,
          comicCount: response.comics.available,
        };
        const characterEntity = this.characterAdapter.toEntity(character);
        characterPerComicArr.push(characterEntity);
      });

      const result = await this.characterRepository.save(characterPerComicArr);
      return result;
    } catch (error: any) {
      throw new Error(`Failed to fetch character data from the comic '${comic.title}': ${error.message}`);
    }
  }

  async getSinglecharacter(characterId: string) {
    const result = await this.characterRepository.getSinglecharacter(characterId);
    return result;
  }

  async fetchComicData() {
    try {
      const comicRequest = await fetch(
        `https://gateway.marvel.com/v1/public/comics${serverConfig.MARVEL_API_AUTH}&title=Secret%20Wars`,
      );

      const response: IHasResponseBody<IComicResponseBody> = await comicRequest.json();
      const comicArr = response.data.results;

      comicArr.forEach((response) => {
        const characterURL: string = response.characters.collectionURI;
        this.fetchCharData(characterURL, response.title);
      });
    } catch (error: any) {
      throw new Error(`Failed to fetch comic data: ${error.message}`);
    }
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

  async deleteManyCharacters() {
    await this.characterRepository.deleteManyCharacters();
  }

  async getByComicCount(comicCount: number) {
    const result = await this.characterRepository.getByComicCount(comicCount);
    return result;
  }

  async getWithSecondTitle() {
    const result = await this.characterRepository.getWithSecondTitle();
    return result;
  }
}
