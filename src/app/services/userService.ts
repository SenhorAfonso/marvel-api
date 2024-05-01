import IRegisterUserPayload from '../../interfaces/user/IRegisterUserPayload';
import ILoginUserPayload from '../../interfaces/user/ILoginUserPayload';
import userRepository from '../repositories/userRepository';

class userService {

  static async registerNewUser(registerUserPayload: IRegisterUserPayload) {
    const result = await userRepository.registerNewUser(registerUserPayload);
    return result;
  }

  static async loginUser(loginUserPayload: ILoginUserPayload) {
    const result = await userRepository.loginUser(loginUserPayload);
    return result;
  }

}

export default userService;