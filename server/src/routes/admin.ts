import { Router } from 'express';

import { authAdmin, authModeratorClub, authOrganizer } from '../middleware/authRole.js';
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
  getFairRideBan,
  updateClub,
} from '../controllers/admin.js';
import { createNotificationLetter, postNotification } from '../controllers/notification.js';
import { FinishProtocolController } from '../controllers/finish-protocol.js';

const finishProtocolController = new FinishProtocolController();

export const routerAdmin = Router();
// routerAdmin.get('*', (req, res) => console.log(req.path)); // Для контроля всех запросов.

routerAdmin.get('/users', authAdmin, getUsers);
routerAdmin.get('/clubs', authOrganizer, getClubs);
routerAdmin.get('/clubs/:id', authAdmin, getClub);
routerAdmin.post('/clubs', authAdmin, postClub);
routerAdmin.delete('/clubs', authAdmin, deleteClub);
routerAdmin.put('/clubs', authOrganizer, updateClub);
routerAdmin.put('/clubs/moderators', authAdmin, addClubModerator);
routerAdmin.delete('/clubs/moderators', authAdmin, deleteClubModerator);
routerAdmin.get('/organizers', authAdmin, getOrganizers);
routerAdmin.post('/organizers', authAdmin, postOrganizers);
routerAdmin.delete('/organizers', authAdmin, deleteOrganizers);
routerAdmin.put('/fitfile', authAdmin, putActivityInFitFile);
routerAdmin.get('/fitfile/:zwiftId', authAdmin, getActivityInFitFile);
routerAdmin.put('/riders/power-curve', authAdmin, updateFitFileAndPowerCurve);
routerAdmin.put('/riders/ban', authAdmin, updateFairRideBan);
routerAdmin.get('/riders/ban/:zwiftId', authAdmin, getFairRideBan);
routerAdmin.post('/notification', authAdmin, postNotification);
routerAdmin.post('/notification/letter-preview', authAdmin, createNotificationLetter);
routerAdmin.get(
  '/finish-protocols/:organizerId?',
  authModeratorClub,
  finishProtocolController.getAll
);
routerAdmin.post('/finish-protocols', authAdmin, finishProtocolController.post);
routerAdmin.put('/finish-protocols', authAdmin, finishProtocolController.put);
routerAdmin.delete('/finish-protocols/:configFP', authAdmin, finishProtocolController.delete);
