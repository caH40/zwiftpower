import { Router } from 'express';

import { authAdmin } from '../middleware/authRole.js';
import { getEvent, putEvent, postEvent, putSingedRiders } from '../controllers/zwift.js';

export const routerZwift = new Router();

routerZwift.get('/events/:eventId', authAdmin, getEvent);
routerZwift.put('/events', authAdmin, putEvent);
routerZwift.post('/events', authAdmin, postEvent);
routerZwift.put('/events/singed', authAdmin, putSingedRiders);
