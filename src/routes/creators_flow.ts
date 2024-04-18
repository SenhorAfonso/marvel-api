import Router from 'express';
import CreatorController from '../app/controllers/creator_controller';

const creatorRouter = Router();

creatorRouter.get('/fetch-creators', CreatorController.fetchCreators);

creatorRouter.get('/creators', CreatorController.getCreators);

creatorRouter.put('/creator/:id', CreatorController.updateCreator);

creatorRouter.delete('/creator/:id', CreatorController.deleteCreator);

export default creatorRouter;