import { Router } from 'express';
import ComicController from '../app/controllers/comic_controller';

const comicRouter = Router();

comicRouter.post('/comics', ComicController.addNewComic);
comicRouter.get('/comics', ComicController.getAllComics);
comicRouter.put('/comic/:comicId', ComicController.updateComicInfo);
comicRouter.delete('/comic/:comicId', ComicController.deleteComicInfo);

export default comicRouter;