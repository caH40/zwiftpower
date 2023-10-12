import { Router } from 'express';

import {
  getUserResults,
  getUserPower,
  getZwiftProfiles,
  putUserZwiftId,
  deleteUserZwiftId,
} from '../controllers/profile.js';

import { checkAuth } from '../middleware/auth.js';

export const routerProfile = Router();

routerProfile.get('/:zwiftId/results', getUserResults);
routerProfile.get('/:zwiftId/power', getUserPower);
routerProfile.get('/:zwiftId/zwift-profiles', getZwiftProfiles);
routerProfile.put('/zwiftid', checkAuth, putUserZwiftId);
routerProfile.delete('/zwiftid', checkAuth, deleteUserZwiftId);
