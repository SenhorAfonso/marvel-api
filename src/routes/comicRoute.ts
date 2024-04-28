import { Router } from 'express';
import ComicController from '../app/controllers/comic_controller';

const comicRouter = Router();

comicRouter.get('/fetch-comics', ComicController.fetchComics);
comicRouter.get('/reset-comics', ComicController.resetComics);
comicRouter.get('/comics', ComicController.getAllComics);
comicRouter.get('/comics/pageCount', ComicController.getByPageCount);
comicRouter.post('/comic', ComicController.addComic);
comicRouter.get('/comic/:comicId', ComicController.getSingleComic);
comicRouter.put('/comic/:comicId', ComicController.updateComicInfo);
comicRouter.delete('/comic/:comicId', ComicController.deleteComicInfo);

export default comicRouter;