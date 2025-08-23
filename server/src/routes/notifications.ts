import { Router } from 'express';

import { postYooKassaNotificationsController } from '../controllers/notifications.js';

export const notificationsRouter = Router();

notificationsRouter.post('/yookassa', postYooKassaNotificationsController);
