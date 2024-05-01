import jwt from 'jsonwebtoken';
import IRegisterUserPayload from '../../interfaces/user/IRegisterUserPayload';
import ILoginUserPayload from '../../interfaces/user/ILoginUserPayload';
import userRepository from '../repositories/userRepository';
import serverConfig from '../../configs/serverConfig';
import IUserDocument from '../../interfaces/user/IUserDocument';

class userService {

  static async registerNewUser(registerUserPayload: IRegisterUserPayload) {
    const result = await userRepository.registerNewUser(registerUserPayload);
    return result;
  }

  static async loginUser(
    loginUserPayload: ILoginUserPayload
  ): Promise<{
    result: {
      user: IUserDocument,
      token: string
    }
  }> {
    const { result } = await userRepository.loginUser(loginUserPayload);

    const userID = result.id;
    const token = jwt.sign({ userID }, serverConfig.JWT_SECRET!);

    return { result: { user: result, token } };
  }

}

export default userService;