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
