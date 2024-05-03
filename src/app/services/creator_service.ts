import mongoose from 'mongoose';
import serverConfig from '../../configs/serverConfig';
import ICreatorsComicResult from '../../interfaces/creators/ICreatorsComicsResult';
import IHasResponseBody from '../../interfaces/generics/IHasResponseBody';
import IComicResponseBody from '../../interfaces/comic/IComicResponseBody';
import ICreators from '../../interfaces/creators/ICreators';
import ICreatorsArray from '../../interfaces/creators/ICreatorsArray';
import CreatorRepository from '../repositories/creator_repository';
import IUpdateCreatorInfo from '../../interfaces/creators/IUpdateCreatorInfo';
import IPagination from '../../interfaces/IPagination';
import APIUtils from '../utils/APIUtils';
import client from '../models/extra/mongooseCache';
import IAddNewCreator from '../../interfaces/creators/IAddNewCreator';

class CreatorService {

  static async fetchCreators() {
    const responseStart = Date.now();
    const cachedValue = await client.get('fetch-creators');
    let result: mongoose.Document[];
    if (cachedValue) {
      await client.set('fetch-creators', cachedValue, 'EX', serverConfig.CACHE_EXPIRATION_TIME!);
      result = JSON.parse(cachedValue);
    } else {
      const comicsRequest = await fetch(`https://gateway.marvel.com/v1/public/comics${serverConfig.MARVEL_API_AUTH}&title=Secret%20Wars`);
      const comicsResponseBody: IHasResponseBody<IComicResponseBody> = await comicsRequest.json();
      const comicsArray = comicsResponseBody.data.results;
      const creators: Array<Array<ICreators>> = [];

      await Promise.all(comicsArray.map(async comic => {
        const creatorsArray = comic.creators.items;
        const creator = (await this.getCreatorsInfo(creatorsArray, comic.title));
        creators.push(creator);
      }));

      ({ result } = await CreatorRepository.saveCreators(creators.flat()));
      await client.set('fetch-creators', JSON.stringify(result), 'EX', serverConfig.CACHE_EXPIRATION_TIME!);
    }
    const responseTime = Date.now() - responseStart;
    return { result, responseTime };
  }

  static async getCreators(pagination: IPagination) {
    const queryObject = APIUtils.createQueryObject(pagination);
    const result = await CreatorRepository.getCreators(queryObject);
    return result;
  }

  static async getSingleCreator(creatorID: string) {
    const result = await CreatorRepository.getSingleCreator(creatorID);
    return result;
  }

  static async addCreator(newCreator: IAddNewCreator) {
    newCreator.collectionSize = newCreator.otherComics.length + 1;
    const result = await CreatorRepository.addCreator(newCreator);
    return result;
  }

  static async updateCreator(creatorNewInfo: IUpdateCreatorInfo) {
    creatorNewInfo.collectionSize = creatorNewInfo.otherComics.length + 1;

    const result = await CreatorRepository.updateCreator(creatorNewInfo);
    return result;
  }

  static async deleteCreator(creatorID: string) {
    const result = await CreatorRepository.deleteCreator(creatorID);
    return result;
  }

  static async deleteManyCreators() {
    client.del('fetch-creators');
    await CreatorRepository.deleteManyCreators();
  }

  static async getCreatorComics(creatorURL: string) {
    const individualCollectionRequest = await fetch(`${creatorURL}${serverConfig.MARVEL_API_AUTH}`);
    const individualCollectionRequestBody: IHasResponseBody<ICreatorsComicResult> = await individualCollectionRequest.json();
    const individualCollectionSize = individualCollectionRequestBody.data.results[0].comics.available;
    const individualCollectionItems = individualCollectionRequestBody.data.results[0].comics.items;
    const otherComics: string[] = [];

    individualCollectionItems.forEach(comic => {
      otherComics.push(comic.name);
    });

    return { otherComics, individualCollectionSize };
  }

  static async getCreatorsInfo(creatorsArray: ICreatorsArray[], sagaComic: string) {
    const creators = await Promise.all(creatorsArray.map(async creatorInfo => {
      const collection = await this.getCreatorComics(creatorInfo.resourceURI);
      const creator = {
        name: creatorInfo.name,
        role: creatorInfo.role,
        sagaComic,
        otherComics: collection.otherComics,
        collectionSize: collection.individualCollectionSize
      };
      return creator;
    }));

    return creators;
  }

  static async getByCollectionSize(collSize: number) {
    const result = await CreatorRepository.getByCollectionSize(collSize);
    return result;
  }

  static async getByNameLength(nameLength: number) {
    const result = await CreatorRepository.getByNameLength(nameLength);
    return result;
  }

}

export default CreatorService;