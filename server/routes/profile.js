import { Router } from 'express';
import { getUserResults, getUserPower } from '../controllers/profile.js';

export const routerProfile = new Router();

routerProfile.get('/:zwiftId/results', getUserResults);
routerProfile.get('/:zwiftId/power', getUserPower);
