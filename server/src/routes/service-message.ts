import { Router } from 'express';

import { checkAuth } from '../middleware/auth.js';
import { ServiceMessageController } from '../controllers/ServiceMessage.js';

export const serviceMessageRouter = Router();

const controller = new ServiceMessageController();

serviceMessageRouter.get('/', checkAuth, controller.getAll);
