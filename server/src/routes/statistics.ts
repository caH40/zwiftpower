import { Router } from 'express';

import {
  getLeadersInIntervals,
  getRidersInEvents,
  getRidersTotal,
  getRidersTotalRacingScore,
  getRidersTotalAge,
  getTeams,
} from '../controllers/statistics.js';

export const statisticsRouter = Router();

statisticsRouter.get('/riders-in-events/:period', getRidersInEvents);
statisticsRouter.get('/leaders-intervals/:male', getLeadersInIntervals);
statisticsRouter.get('/riders-total', getRidersTotal);
statisticsRouter.get('/riders-total-racing-score', getRidersTotalRacingScore);
statisticsRouter.get('/riders-total-age', getRidersTotalAge);
statisticsRouter.get('/teams/:seasonLabel', getTeams);
