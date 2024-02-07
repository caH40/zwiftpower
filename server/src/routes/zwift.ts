import { Router } from 'express';

import { authModerator } from '../middleware/authRole.js';
import {
  getEventZwift,
  getZwiftRider,
  putEvent,
  getZwiftEventResults,
  postZwiftEvent,
} from '../controllers/zwift.js';

export const routerZwift = Router();

routerZwift.get('/events/:eventId', authModerator, getEventZwift);
routerZwift.put('/events', authModerator, putEvent);
routerZwift.post('/events', authModerator, postZwiftEvent);
routerZwift.get('/rider/:zwiftId', getZwiftRider);
routerZwift.get('/download/event-results/:eventId', authModerator, getZwiftEventResults);
