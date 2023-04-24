import { Router } from 'express';

import { authAdmin } from '../middleware/authRole.js';
import { getEvent, getEvents } from '../controllers/race.js';

export const routerRace = new Router();

routerRace.get('/events/:eventId', getEvent);
routerRace.get('/events', getEvents);
