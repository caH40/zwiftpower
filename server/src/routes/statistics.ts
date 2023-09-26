import { Router } from 'express';

import { getRidersInEvents } from '../controllers/statistics.js';

export const statisticsRouter = Router();

statisticsRouter.get('/riders-in-events/:period', getRidersInEvents);
