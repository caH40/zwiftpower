import { Router } from 'express';

import { authModerator } from '../middleware/authRole.js';
import { putOrganizerBotZwift } from '../controllers/organizer.js';

export const routerOrganizer = Router();

routerOrganizer.put('/bots', authModerator, putOrganizerBotZwift);
