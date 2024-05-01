import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import userService from '../services/userService';

class userController {

  static async registerNewUser (
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'User successfully registered!';
    const status: number = StatusCodes.OK;

    const { username, email, password, confirmPassword } = req.body;

    const { result } = await userService.registerNewUser({ username, email, password, confirmPassword });

    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async loginUser(
    req: Request,
    res: Response
  ) {
    const success: boolean = true;
    const message: string = 'User successfully logged in!';
    const status: number = StatusCodes.OK;

    const { email, password } = req.body;
    const { result } = await userService.loginUser({ email, password });

    res.status(status).json({ code: status, success, message, data: { result } });
  }

}

export default userController;