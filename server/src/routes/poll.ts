import { Router } from 'express';
import { PollController } from '../controllers/Poll.js';
import { checkAuth } from '../middleware/auth.js';

export const pollRouter = Router();

const pollController = new PollController();

pollRouter.get('/:pollId', checkAuth, pollController.get);

pollRouter.post('/', checkAuth, pollController.post);
pollRouter.post('/answers', checkAuth, pollController.postAnswers);
