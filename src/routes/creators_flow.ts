import Router from 'express';

const creatorRouter = Router();

creatorRouter.post('/creators', (req, res) => {
  res.send('Creating a new creator');
});

creatorRouter.get('/creators', (req, res) => {
  res.send('Retrieving all creators');
});

creatorRouter.put('/creator/:id', (req, res) => {
  res.send('Updating a creator');
});

creatorRouter.delete('/creator/:id', (req, res) => {
  res.send('Deleting a creator');
});

export default creatorRouter;