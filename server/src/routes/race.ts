import { Router } from 'express';

import { authModerator } from '../middleware/authRole.js';
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
routerRace.put('/events', authModerator, putEvent); // ручное обновление Эвента
routerRace.delete('/events', authModerator, deleteEventAndResults); // ручное удаление Эвента и результатов
routerRace.put('/results', authModerator, putResults); // ручное обновление результатов
routerRace.get('/results/:eventId', getResults);
routerRace.get('/series', getSeries);
routerRace.get('/series/results/:type/:season', getResultsSeries);
routerRace.put('/result', authModerator, putResult);
