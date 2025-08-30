import { Router } from 'express';

import {
  getAllSiteServicesController,
  getSiteServicesController,
} from '../controllers/site-services.js';
import { checkAuth } from '../middleware/auth.js';

export const siteServiceRouter = Router();

// Маршрут для получения всех платных сервисов на сайте.
siteServiceRouter.get('/purchasable', checkAuth, getSiteServicesController);
siteServiceRouter.get('/', checkAuth, getAllSiteServicesController);
