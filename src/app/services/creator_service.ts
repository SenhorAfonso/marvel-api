import CreatorRepository from '../repositories/creator_repository';

class CreatorService {

  static fetchCreators() {
    const result = CreatorRepository.saveCreators();
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

}

export default CreatorService;