import { Router } from 'express';

import { getSiteServicesController } from '../controllers/site-services.js';

export const siteServiceRouter = Router();

// Маршрут для получения всех платных сервисов на сайте.
siteServiceRouter.get('', getSiteServicesController);
