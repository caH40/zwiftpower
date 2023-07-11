import { Router } from 'express';

import { authAdmin } from '../middleware/authRole.js';
import {
  getEvent,
  getEvents,
  postEvent,
  putEvent,
  putResults,
  deleteEventAndResults,
  getResults,
  getUserResults,
  getSeries,
  getResultsSeries,
} from '../controllers/race.js';

export const routerRace = new Router();

routerRace.get('/events/:eventId', getEvent);
routerRace.get('/events', getEvents);
routerRace.post('/events', authAdmin, postEvent);
routerRace.put('/events', authAdmin, putEvent);
routerRace.delete('/events', authAdmin, deleteEventAndResults);
routerRace.put('/results', authAdmin, putResults);
routerRace.get('/results/:eventId', getResults);
routerRace.get('/profile/:zwiftId/results', getUserResults);
routerRace.get('/series', getSeries);
routerRace.get('/series/results/:type', getResultsSeries);
