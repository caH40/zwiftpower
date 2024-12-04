import { Router } from 'express';

import { authModeratorClub } from '../middleware/authRole.js';
import {
  getEventZwift,
  getZwiftRider,
  putEventZwift,
  getZwiftEventResults,
  postZwiftEvent,
} from '../controllers/zwift.js';

export const routerZwift = Router();

routerZwift.get('/events/:eventId/:forView', authModeratorClub, getEventZwift);
routerZwift.put('/events', authModeratorClub, putEventZwift);
routerZwift.post('/events', authModeratorClub, postZwiftEvent);
routerZwift.get('/rider/:zwiftId', getZwiftRider);
routerZwift.get('/download/event-results/:eventId', authModeratorClub, getZwiftEventResults);
