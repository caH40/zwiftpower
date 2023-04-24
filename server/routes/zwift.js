import { Router } from 'express';

import { authAdmin } from '../middleware/authRole.js';
import { getEvent, putEvent, postEvent, getEvents } from '../controllers/zwift.js';

export const routerZwift = new Router();

routerZwift.get('/events/:eventId', authAdmin, getEvent);
routerZwift.put('/events', authAdmin, putEvent);
routerZwift.post('/events', authAdmin, postEvent);
routerZwift.get('/events', getEvents);
