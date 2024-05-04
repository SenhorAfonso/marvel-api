import Router from 'express';
import CreatorController from '../app/controllers/creator_controller';
import AuthenticationMiddleware from '../app/middlewares/authenticationMiddleware';
import validationMiddleware from '../app/middlewares/validationMiddleware';
import ValidateCreators from '../app/validations/creator/validateCreator';

const creatorRouter = Router();

creatorRouter.get('/fetch-creators',  [ AuthenticationMiddleware.AuthenticateToken ], CreatorController.fetchCreators);

creatorRouter.get('/reset-creators',  [ AuthenticationMiddleware.AuthenticateToken ], CreatorController.resetCreators);

creatorRouter.get('/creators',  [ AuthenticationMiddleware.AuthenticateToken ], CreatorController.getCreators);

creatorRouter.post('/creator',  [
  AuthenticationMiddleware.AuthenticateToken,
  validationMiddleware('body', ValidateCreators.AddCreatorValidation())
], CreatorController.addCreator);

creatorRouter.get('/creators/collectionSize',  [ AuthenticationMiddleware.AuthenticateToken ], CreatorController.getByCollectionSize);

creatorRouter.get('/creators/nameLength',  [ AuthenticationMiddleware.AuthenticateToken ], CreatorController.getByNameLength);

creatorRouter.get('/creator/:creatorID',  [ AuthenticationMiddleware.AuthenticateToken ], CreatorController.getSingleCreator);

creatorRouter.put('/creator/:creatorID',  [
  AuthenticationMiddleware.AuthenticateToken,
  validationMiddleware('body', ValidateCreators.UpdateCreatorValidation())
], CreatorController.updateCreator);

creatorRouter.delete('/creator/:creatorID',  [ AuthenticationMiddleware.AuthenticateToken ], CreatorController.deleteCreator);

export default creatorRouter;