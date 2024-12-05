import { Router } from 'express';

import { getSeriesActual, getLogsAdmins } from '../controllers/controllers.js';

import { authAdmin, authModerator, authModeratorClub } from '../middleware/authRole.js';
import {
  getLogsErrors,
  getLogError,
  deleteLogError,
  deleteLogAdmin,
} from '../controllers/logs.js';
import { getRiders } from '../controllers/riders.js';
import { getEnabledUserStreams } from '../controllers/streams.js';
import { getUsersForModerator } from '../controllers/admin.js';

export const router = Router();

router.get('/series/actual', authModeratorClub, getSeriesActual); // вроде рабочий
router.get('/logs/admins', authAdmin, getLogsAdmins);
router.get('/logs/errors', authAdmin, getLogsErrors);
router.delete('/logs/errors', authAdmin, deleteLogError);
router.delete('/logs/admins', authAdmin, deleteLogAdmin);
router.get('/logs/error', authAdmin, getLogError);
router.get('/riders', getRiders);
router.get('/streams', getEnabledUserStreams);
router.get('/moderator/users', authModerator, getUsersForModerator);
