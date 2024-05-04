import mongoose from 'mongoose';
import IRegisterUserPayload from '../../interfaces/user/IRegisterUserPayload';
import ILoginUserPayload from '../../interfaces/user/ILoginUserPayload';
import userModel from '../models/userModel';
import InternalServerError from '../errors/internalServerError';
import APIUtils from '../utils/APIUtils';
import BadRequestError from '../errors/badRequestError';
import IUserDocument from '../../interfaces/user/IUserDocument';
import DuplicatedValueError from '../errors/duplicatedValueError';

class userRepository {

  static async registerNewUser(registerUserPayload: IRegisterUserPayload) {
    const { email } = registerUserPayload;
    let emailAlreadyInUse: mongoose.Document | null;

    try {
      emailAlreadyInUse = await userModel.findOne({ email });
    } catch (error) {
      throw new InternalServerError();
    }

    if (emailAlreadyInUse) {
      throw new DuplicatedValueError('The email is already in use');
    }

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
      throw new BadRequestError('The email or password provided is incorrect!');
    }
    const userPassword = result.password;
    if (APIUtils.passwordsDontMatch(password, userPassword)) {
      throw new BadRequestError('The email or password provided is incorrect!');
    }

    return { result };
  }

}

export default userRepository;