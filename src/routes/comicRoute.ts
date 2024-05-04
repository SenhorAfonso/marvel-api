import { Router } from 'express';
import ComicController from '../app/controllers/comicController';
import validationMiddleware from '../app/middlewares/validationMiddleware';
import ValidateComics from '../app/validations/comics/validateComic';
import AuthenticationMiddleware from '../app/middlewares/authenticationMiddleware';

const comicRouter = Router();

comicRouter.get('/fetch-comics', [ AuthenticationMiddleware.AuthenticateToken ], ComicController.fetchComics);

comicRouter.get('/reset-comics', [ AuthenticationMiddleware.AuthenticateToken ], ComicController.resetComics);

comicRouter.get('/comics', [ AuthenticationMiddleware.AuthenticateToken ], ComicController.getAllComics);

comicRouter.get('/comics/pageCount', [ AuthenticationMiddleware.AuthenticateToken ], ComicController.getByPageCount);

comicRouter.post('/comic',[
  AuthenticationMiddleware.AuthenticateToken,
  validationMiddleware('body', ValidateComics.CreateComicValidation())
], ComicController.addComic);

comicRouter.get('/comic/:comicId', [ AuthenticationMiddleware.AuthenticateToken ], ComicController.getSingleComic);

comicRouter.put('/comic/:comicId', [
  AuthenticationMiddleware.AuthenticateToken,
  validationMiddleware('body', ValidateComics.UpdateComicValidation())
], ComicController.updateComicInfo);

comicRouter.delete('/comic/:comicId', [ AuthenticationMiddleware.AuthenticateToken ], ComicController.deleteComicInfo);

export default comicRouter;