import { Router } from 'express';
import CharacterController from '../app/controllers/characterController';
import validationMiddleware from '../app/middlewares/validationMiddleware';
import ValidateCharacters from '../app/validations/character/validateCharacter';
import AuthenticationMiddleware from '../app/middlewares/authenticationMiddleware';

const characterRouter = Router();
const characterController = new CharacterController();

characterRouter.get('/fetch-characters', [
  AuthenticationMiddleware.AuthenticateToken
], characterController.fetchData.bind(characterController));

characterRouter.post('/character', [
  AuthenticationMiddleware.AuthenticateToken,
  validationMiddleware('body', ValidateCharacters.CreateCharacterValidation())
] , characterController.create.bind(characterController));

characterRouter.get('/characters', [
  AuthenticationMiddleware.AuthenticateToken
], characterController.findAll.bind(characterController));

characterRouter.get('/reset-characters', [
  AuthenticationMiddleware.AuthenticateToken
], characterController.resetCharacters.bind(characterController));

characterRouter.get('/characters/comicCount', [
  AuthenticationMiddleware.AuthenticateToken
], characterController.getByComicCount.bind(characterController));

characterRouter.get('/characters/secondTitle', [
  AuthenticationMiddleware.AuthenticateToken
], characterController.getWithSecondTitle.bind(characterController));

characterRouter.get('/character/:characterId', [
  AuthenticationMiddleware.AuthenticateToken
], characterController.getSingle.bind(characterController));

characterRouter.put('/character/:characterId', [
  AuthenticationMiddleware.AuthenticateToken,
  validationMiddleware('body', ValidateCharacters.UpdateCharacterValidation())
] , characterController.updateById.bind(characterController));

characterRouter.delete('/character/:characterId', [
  AuthenticationMiddleware.AuthenticateToken
], characterController.deleteById.bind(characterController));

export default characterRouter;
