import { Router } from 'express';

import { authModeratorClub } from '../middleware/authRole.js';
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
routerRace.post('/events', authModeratorClub, postEvent);
routerRace.put('/events', authModeratorClub, putEvent); // ручное обновление Эвента
routerRace.delete('/events', authModeratorClub, deleteEventAndResults); // ручное удаление Эвента и результатов
routerRace.put('/results', authModeratorClub, putResults); // ручное обновление результатов
routerRace.get('/results/:eventId', getResults);
routerRace.get('/series', getSeries);
routerRace.get('/series/results/:type/:season', getResultsSeries);
routerRace.put('/result', authModeratorClub, putResult);
