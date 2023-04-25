import { Router } from 'express';

import { authAdmin } from '../middleware/authRole.js';
import { deleteEvent, getEvent, getEvents, postEvent, putEvent } from '../controllers/race.js';

export const routerRace = new Router();

routerRace.get('/events/:eventId', getEvent);
routerRace.get('/events', getEvents);
routerRace.post('/events', authAdmin, postEvent);
routerRace.put('/events', authAdmin, putEvent);
routerRace.delete('/events', authAdmin, deleteEvent);
