import { Router } from 'express';
import CharacterController from '../app/controllers/character_controller';

const characterRouter = Router();
const characterController = new CharacterController();

characterRouter.get('/fetch-characters', characterController.fetchData.bind(characterController));
characterRouter.post('/character', characterController.create.bind(characterController));
characterRouter.get('/characters', characterController.findAll.bind(characterController));
characterRouter.get('/reset-characters', characterController.resetCharacters.bind(characterController));
characterRouter.get('/character/:characterId', characterController.getSingle.bind(characterController));
characterRouter.put('/character/:characterId', characterController.updateById.bind(characterController));
characterRouter.delete('/character/:characterId', characterController.deleteById.bind(characterController));

export default characterRouter;
