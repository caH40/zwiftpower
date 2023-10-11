import { Router } from 'express';
import { getUserResults, getUserPower, getZwiftProfiles } from '../controllers/profile.js';

export const routerProfile = Router();

routerProfile.get('/:zwiftId/results', getUserResults);
routerProfile.get('/:zwiftId/power', getUserPower);
routerProfile.get('/:zwiftId/zwift-profiles', getZwiftProfiles);
