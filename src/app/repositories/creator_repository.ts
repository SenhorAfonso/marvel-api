import creatorSchema from '../models/creator_schema';

class CreatorRepository {

  static saveCreators(creators: any[]) {
    const result = creatorSchema.create(creators);
    return result;
  }

  static getCreators() {
    const result = 'Retrieving all creators';
    return result;
  }

  static updateCreator() {
    const result = 'Updating a creator';
    return result;
  }

  static deleteCreator() {
    const result = 'Deleting a creator';
    return result;
  }

}

export default CreatorRepository;