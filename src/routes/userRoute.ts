import { Router } from 'express';
import userController from '../app/controllers/userControllers';

const userRouter = Router();

userRouter.post('/user/signup', userController.registerNewUser);
userRouter.post('/user/login', userController.loginUser);

export default userRouter;