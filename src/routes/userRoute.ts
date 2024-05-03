import { Router } from 'express';
import userController from '../app/controllers/userControllers';
import validationMiddleware from '../app/middlewares/validationMiddleware';
import ValidateUser from '../app/validations/user/validateUser';

const userRouter = Router();

userRouter.post('/user/signup', [
  validationMiddleware('body', ValidateUser.registerUser())
], userController.registerNewUser);

userRouter.post('/user/login', [
  validationMiddleware('body', ValidateUser.loginUser())
], userController.loginUser);

export default userRouter;