import { Router } from 'express';

import {
  getLeadersInIntervals,
  getRidersInEvents,
  getRidersTotal,
} from '../controllers/statistics.js';

export const statisticsRouter = Router();

statisticsRouter.get('/riders-in-events/:period', getRidersInEvents);
statisticsRouter.get('/leaders-intervals/:male', getLeadersInIntervals);
statisticsRouter.get('/riders-total', getRidersTotal);
