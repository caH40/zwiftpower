import { Router } from 'express';

import { authModerator } from '../middleware/authRole.js';
import {
  getEventZwift,
  getZwiftRider,
  putEventZwift,
  getZwiftEventResults,
  postZwiftEvent,
} from '../controllers/zwift.js';

export const routerZwift = Router();

routerZwift.get('/events/:eventId/:forView', authModerator, getEventZwift);
routerZwift.put('/events', authModerator, putEventZwift);
routerZwift.post('/events', authModerator, postZwiftEvent);
routerZwift.get('/rider/:zwiftId', getZwiftRider);
routerZwift.get('/download/event-results/:eventId', authModerator, getZwiftEventResults);
