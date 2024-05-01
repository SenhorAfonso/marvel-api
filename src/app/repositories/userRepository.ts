import IRegisterUserPayload from '../../interfaces/user/IRegisterUserPayload';
import ILoginUserPayload from '../../interfaces/user/ILoginUserPayload';
import userModel from '../models/userModel';

class userRepository {

  static async registerNewUser(registerUserPayload: IRegisterUserPayload) {
    const result = await userModel.create(registerUserPayload);
    return result;
  }

  static async loginUser(loginUserPayload: ILoginUserPayload) {
    const result = await userModel.findOne({ email: loginUserPayload.email });
    return result;
  }

}

export default userRepository;