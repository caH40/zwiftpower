import { Router } from 'express';

import {
  postYooKassaNotificationsController,
  getAllYooKassaNotificationsByUserIdController,
} from '../controllers/payment-notifications.js';
import { checkAuth } from '../middleware/auth.js';

export const notificationsRouter = Router();

notificationsRouter.post('/yookassa', postYooKassaNotificationsController);
notificationsRouter.get('/yookassa', checkAuth, getAllYooKassaNotificationsByUserIdController);
