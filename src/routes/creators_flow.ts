import Router from 'express';
import CreatorController from '../app/controllers/creator_controller';

const creatorRouter = Router();

creatorRouter.get('/fetch-creators', CreatorController.fetchCreators);
creatorRouter.get('/reset-creators', CreatorController.reseteCreators);
creatorRouter.get('/creators', CreatorController.getCreators);
creatorRouter.put('/creator/:creatorID', CreatorController.updateCreator);
creatorRouter.delete('/creator/:creatorID', CreatorController.deleteCreator);

export default creatorRouter;