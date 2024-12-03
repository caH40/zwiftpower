import { Router } from 'express';

import { authModerator } from '../middleware/authRole.js';
import { getOrganizerBotZwift, putOrganizerBotZwift } from '../controllers/organizer.js';

export const routerOrganizer = Router();

routerOrganizer.put('/bots', authModerator, putOrganizerBotZwift);
routerOrganizer.get('/bots', authModerator, getOrganizerBotZwift);