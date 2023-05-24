import { Router } from 'express';

import { authAdmin } from '../middleware/authRole.js';
import { getEvent, getZwiftRider, putEvent } from '../controllers/zwift.js';

export const routerZwift = new Router();

routerZwift.get('/events/:eventId', authAdmin, getEvent);
routerZwift.put('/events', authAdmin, putEvent);
routerZwift.get('/rider/:zwiftId', getZwiftRider);
