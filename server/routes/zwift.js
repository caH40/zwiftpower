import { Router } from 'express';

import { authAdmin } from '../middleware/authRole.js';
import {
  getEvent,
  getZwiftRider,
  putEvent,
  getZwiftEventResults,
} from '../controllers/zwift.js';

export const routerZwift = new Router();

routerZwift.get('/events/:eventId', authAdmin, getEvent);
routerZwift.put('/events', authAdmin, putEvent);
routerZwift.get('/rider/:zwiftId', getZwiftRider);
routerZwift.get('/download/event-results/:eventId', authAdmin, getZwiftEventResults);
