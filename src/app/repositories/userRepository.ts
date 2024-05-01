import IRegisterUserPayload from '../../interfaces/user/IRegisterUserPayload';
import ILoginUserPayload from '../../interfaces/user/ILoginUserPayload';
import userModel from '../models/userModel';
import InternalServerError from '../errors/internalServerError';
import APIUtils from '../utils/APIUtils';
import BadRequestdError from '../errors/badRequestError';
import IUserDocument from '../../interfaces/user/IUserDocument';

class userRepository {

  static async registerNewUser(registerUserPayload: IRegisterUserPayload) {
    const result = await userModel.create(registerUserPayload);
    return { result };
  }

  static async loginUser(
    loginUserPayload: ILoginUserPayload
  ): Promise<{
    result: IUserDocument
  }> {
    const { email, password } = loginUserPayload;
    let result: IUserDocument | null;

    try {
      result = await userModel.findOne({ email }) as IUserDocument;
    } catch (error) {
      throw new InternalServerError();
    }

    if (APIUtils.isEmpty(result)) {
      throw new BadRequestdError('The email or password provided is incorrect!');
    }
    const userPassword = result.password;
    if (APIUtils.passwordsDontMatch(password, userPassword)) {
      throw new BadRequestdError('The email or password provided is incorrect!');
    }

    return { result };
  }

}

export default userRepository;