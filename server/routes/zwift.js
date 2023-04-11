import { Router } from 'express';

import { authAdmin } from '../middleware/authRole.js';
import { getEvent } from '../controllers/zwift.js';

export const routerZwift = new Router();

routerZwift.get('/events/:eventId', authAdmin, getEvent);
