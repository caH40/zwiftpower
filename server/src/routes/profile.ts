import { Router } from 'express';

import {
  getUserResults,
  getUserPower,
  getZwiftProfiles,
  putUserZwiftId,
  deleteUserZwiftId,
  refreshProfile,
} from '../controllers/profile.js';

import { checkAuth } from '../middleware/auth.js';

export const routerProfile = Router();

routerProfile.get('/results', getUserResults);
routerProfile.get('/:zwiftId/power', getUserPower);
routerProfile.get('/:zwiftId/zwift-profiles', getZwiftProfiles);
routerProfile.put('/zwiftid', checkAuth, putUserZwiftId);
routerProfile.delete('/zwiftid', checkAuth, deleteUserZwiftId);
routerProfile.put('/my', checkAuth, refreshProfile);
