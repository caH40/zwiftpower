import { Router } from 'express';

import { authAdmin, authModerator } from '../middleware/authRole.js';
import {
  getEvent,
  getEvents,
  postEvent,
  putEvent,
  putResults,
  deleteEventAndResults,
  getResults,
  getSeries,
  getResultsSeries,
} from '../controllers/race.js';
import { putResult } from '../controllers/result.js';

export const routerRace = Router();

routerRace.get('/events/:eventId', getEvent);
routerRace.get('/events', getEvents);
routerRace.post('/events', authModerator, postEvent);
routerRace.put('/events', authAdmin, putEvent);
routerRace.delete('/events', authAdmin, deleteEventAndResults);
routerRace.put('/results', authAdmin, putResults);
routerRace.get('/results/:eventId', getResults);
routerRace.get('/series', getSeries);
routerRace.get('/series/results/:type/:season', getResultsSeries);
routerRace.put('/result', authAdmin, putResult);
