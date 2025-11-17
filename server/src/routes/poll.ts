import { Router } from 'express';
import { PollController } from '../controllers/Poll.js';
import { checkAuth, getAuthData } from '../middleware/auth.js';

export const pollRouter = Router();

const pollController = new PollController();

pollRouter.get('/:pollId', getAuthData, pollController.get);

pollRouter.post('/', checkAuth, pollController.post);
pollRouter.post('/answers', getAuthData, pollController.postAnswers);
pollRouter.delete('/answers', getAuthData, pollController.deleteAnswers);
