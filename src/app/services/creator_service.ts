import mongoose from 'mongoose';
import serverConfig from '../../configs/serverConfig';
import ICreatorsComicResult from '../../interfaces/creators/ICreatorsComicsResult';
import IHasResponseBody from '../../interfaces/IHasResponseBody';
import IComicResponseBody from '../../interfaces/comic/IComicResponseBody';
import ICreators from '../../interfaces/creators/ICreators';
import ICreatorsArray from '../../interfaces/creators/ICreatorsArray';
import CreatorRepository from '../repositories/creator_repository';
import IUpdateCreatorInfo from '../../interfaces/creators/IUpdateCreatorInfo';
import IPagination from '../../interfaces/IPagination';
import APIUtils from '../utils/APIUtils';
import client from '../models/extra/mongooseCache';

class CreatorService {

  static async fetchCreators() {
    const cachedValue = await client.get('fetch-creators');
    let result: mongoose.Document[];

    if (cachedValue) {
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

    return { result };
  }

  static async getCreators(pagination: IPagination) {
    pagination = APIUtils.createQueryObject(pagination);
    const result = await CreatorRepository.getCreators(pagination);
    return result;
  }

  static async updateCreator(payload: IUpdateCreatorInfo) {
    const result = await CreatorRepository.updateCreator(payload);
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
    const individualCollectionItems = individualCollectionRequestBody.data.results[0].comics.items;
    const otherComics: string[] = [];

    individualCollectionItems.forEach(comic => {
      otherComics.push(comic.name);
    });

    return otherComics;
  }

  static async getCreatorsInfo(creatorsArray: ICreatorsArray[], sagaComic: string) {
    const creators = await Promise.all(creatorsArray.map(async creatorInfo => {
      const creator = {
        name: creatorInfo.name,
        role: creatorInfo.role,
        sagaComic,
        otherComics: await this.getCreatorComics(creatorInfo.resourceURI)
      };
      return creator;
    }));

    return creators;
  }

}

export default CreatorService;