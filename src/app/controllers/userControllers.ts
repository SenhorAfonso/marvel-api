import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import userService from '../services/userService';

class userController {
  static async registerNewUser(req: Request, res: Response) {
    /*
     * #swagger.tags = ['User']
     * #swagger.description = 'Endpoint to register a new user.'
     * #swagger.parameters['newUser'] = {
     *   in: 'body',
     *   description: 'User object containing username, email, password, and confirmPassword',
     *   required: true,
     *   schema: { $ref: "#/components/schemas/UserSignup" }
     * }
     * #swagger.responses[200] = {
     *   description: 'User successfully registered!',
     *   content: {
     *     "application/json": {
     *       schema: {
     *         $ref: "#/components/schemas/User"
     *       }
     *     }
     *   }
     * }
     * #swagger.responses[400] = {
     *   description: 'Error registering user'
     * }
     * #swagger.responses[500] = {
     *   description: 'Server Error'
     * }
     */
    const success: boolean = true;
    const message: string = 'User successfully registered!';
    const status: number = StatusCodes.OK;

    const { username, email, password, confirmPassword } = req.body;

    const { result } = await userService.registerNewUser({ username, email, password, confirmPassword });

    res.status(status).json({ code: status, success, message, data: { result } });
  }

  static async loginUser(req: Request, res: Response) {
    /*
     * #swagger.tags = ['User']
     * #swagger.description = 'Endpoint to log in a user.'
     * #swagger.parameters['loginUser'] = {
     *   in: 'body',
     *   description: 'User object containing email and password',
     *   required: true,
     *  schema: { $ref: "#/components/schemas/UserLogin" }
     * }
     * #swagger.responses[200] = {
     *   description: 'User successfully logged in!',
     *   content: {
     *     "application/json": {
     *       schema: {
     *         $ref: "#/components/schemas/User"
     *       }
     *     }
     *   }
     * }
     * #swagger.responses[400] = {
     *   description: 'Error logging in user'
     * }
     * #swagger.responses[401] = {
     *   description: 'Unauthorized'
     * }
     * #swagger.responses[500] = {
     *   description: 'Server Error'
     * }
     */
    const success: boolean = true;
    const message: string = 'User successfully logged in!';
    const status: number = StatusCodes.OK;

    const { email, password } = req.body;
    const { result } = await userService.loginUser({ email, password });

    res.status(status).json({ code: status, success, message, data: { result } });
  }
}

export default userController;
