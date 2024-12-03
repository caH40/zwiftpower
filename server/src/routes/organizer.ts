import { Router } from 'express';

import { authModerator } from '../middleware/authRole.js';
import {
  deleteClubsZwift,
  deleteOrganizerBotZwift,
  getClubsZwift,
  getOrganizerBotZwift,
  putOrganizerBotZwift,
} from '../controllers/organizer.js';

export const routerOrganizer = Router();

routerOrganizer.put('/bots', authModerator, putOrganizerBotZwift);
routerOrganizer.get('/bots', authModerator, getOrganizerBotZwift);
routerOrganizer.delete('/bots', authModerator, deleteOrganizerBotZwift);
routerOrganizer.get('/clubs/:organizerId', authModerator, getClubsZwift);
routerOrganizer.delete('/clubs', authModerator, deleteClubsZwift);
