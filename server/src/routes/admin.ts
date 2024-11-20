import { Router } from 'express';

import { authAdmin, authModerator } from '../middleware/authRole.js';
import {
  getClubs,
  getClub,
  getUsers,
  postClub,
  deleteClub,
  addClubModerator,
  deleteClubModerator,
  getOrganizers,
  postOrganizers,
  deleteOrganizers,
  putActivityInFitFile,
  getActivityInFitFile,
  updateFitFileAndPowerCurve,
  updateFairRideBan,
} from '../controllers/admin.js';
import { postNotification } from '../controllers/notification.js';

export const routerAdmin = Router();

routerAdmin.get('/users', authAdmin, getUsers);
routerAdmin.get('/clubs', authModerator, getClubs);
routerAdmin.get('/clubs/:id', authAdmin, getClub);
routerAdmin.post('/clubs', authAdmin, postClub);
routerAdmin.delete('/clubs', authAdmin, deleteClub);
routerAdmin.put('/clubs/moderators', authAdmin, addClubModerator);
routerAdmin.delete('/clubs/moderators', authAdmin, deleteClubModerator);
routerAdmin.get('/organizers', authAdmin, getOrganizers);
routerAdmin.post('/organizers', authAdmin, postOrganizers);
routerAdmin.delete('/organizers', authAdmin, deleteOrganizers);
routerAdmin.post('/notification', authAdmin, postNotification);
routerAdmin.put('/fitfile', authAdmin, putActivityInFitFile);
routerAdmin.get('/fitfile/:zwiftId', authAdmin, getActivityInFitFile);
routerAdmin.put('/riders/power-curve', authAdmin, updateFitFileAndPowerCurve);
routerAdmin.put('/riders/ban', authAdmin, updateFairRideBan);
