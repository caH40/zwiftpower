import { Router } from 'express';

import { authAdmin } from '../middleware/authRole.js';
import { getEvent } from '../controllers/race.js';

export const routerRace = new Router();

routerRace.get('/events/:eventId', getEvent);
