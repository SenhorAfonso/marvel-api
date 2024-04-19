import serverConfig from '../../configs/serverConfig';
import ICreatorsComicResult from '../../interfaces/creators/ICreatorsComicsResult';
import IHasResponseBody from '../../interfaces/IHasResponseBody';
import IComicResponseBody from '../../interfaces/comic/IComicResponseBody';
import ICreators from '../../interfaces/creators/ICreators';
import ICreatorsArray from '../../interfaces/creators/ICreatorsArray';
import CreatorRepository from '../repositories/creator_repository';

class CreatorService {

  static async fetchCreators() {
    const comicsRequest = await fetch(`https://gateway.marvel.com/v1/public/comics${serverConfig.MARVEL_API_AUTH}&title=Secret%20Wars`);
    const comicsResponseBody: IHasResponseBody<IComicResponseBody> = await comicsRequest.json();
    const comicsArray = comicsResponseBody.data.results;
    const creators: Array<Array<ICreators>> = [];

    await Promise.all(comicsArray.map(async comic => {
      const creatorsArray = comic.creators.items;
      const creator = (await this.getCreatorsInfo(creatorsArray, comic.title));
      creators.push(creator);
    }));

    const result = CreatorRepository.saveCreators(creators.flat());
    return result;
  }

  static getCreators() {
    const result = CreatorRepository.getCreators();
    return result;
  }

  static updateCreator() {
    const result = CreatorRepository.updateCreator();
    return result;
  }

  static deleteCreator() {
    const result = CreatorRepository.deleteCreator();
    return result;
  }

  static async getCreatorComics(creatorURL: string) {
    const individualCollectionRequest = await fetch(`${creatorURL}${serverConfig.MARVEL_API_AUTH}`);
    const individualCollectionRequestBody: IHasResponseBody<ICreatorsComicResult> = await individualCollectionRequest.json();
    const individualCollectionItems = individualCollectionRequestBody.data.results[0].comics.items;
    const comics: string[] = [];

    individualCollectionItems.forEach(comic => {
      comics.push(comic.name);
    });

    return comics;
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