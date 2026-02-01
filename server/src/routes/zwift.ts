import { Router } from 'express';

import { authModeratorClub } from '../middleware/authRole.js';
import {
  getEventZwift,
  getZwiftRider,
  putEventZwift,
  getZwiftEventResults,
  postZwiftEvent,
  getEventZwiftForEdit,
} from '../controllers/zwift.js';
import { checkAuth } from '../middleware/auth.js';

export const routerZwift = Router();

routerZwift.get('/events/moderator/:eventId', authModeratorClub, getEventZwiftForEdit);
routerZwift.get('/events/:eventId/:organizerId', authModeratorClub, getEventZwift);
routerZwift.put('/events', authModeratorClub, putEventZwift);
routerZwift.post('/events', authModeratorClub, postZwiftEvent);
routerZwift.get('/rider/:zwiftId', getZwiftRider);
routerZwift.get('/download/event-results/:eventId', checkAuth, getZwiftEventResults);
