import Router from 'express';
import CreatorController from '../app/controllers/creator_controller';

const creatorRouter = Router();

creatorRouter.get('/fetch-creators', CreatorController.fetchCreators);
creatorRouter.get('/reset-creators', CreatorController.resetCreators);
creatorRouter.get('/creators', CreatorController.getCreators);
creatorRouter.get('/creators/collectionSize', CreatorController.getByCollectionSize);
creatorRouter.post('/creator', CreatorController.addCreator);
creatorRouter.get('/creator/:creatorID', CreatorController.getSingleCreator);
creatorRouter.put('/creator/:creatorID', CreatorController.updateCreator);
creatorRouter.delete('/creator/:creatorID', CreatorController.deleteCreator);

export default creatorRouter;