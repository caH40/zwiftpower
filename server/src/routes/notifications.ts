import { Router } from 'express';

import {
  postYooKassaNotificationsController,
  getAllYooKassaNotificationsByUserIdController,
} from '../controllers/payment-notifications.js';
import { checkAuth } from '../middleware/auth.js';
import { unsubscribeNotificationsController } from '../controllers/notification.js';

export const notificationsRouter = Router();

notificationsRouter.post('/yookassa', postYooKassaNotificationsController);
notificationsRouter.get('/yookassa', checkAuth, getAllYooKassaNotificationsByUserIdController);
notificationsRouter.patch('/unsubscribe/:userId', unsubscribeNotificationsController);
