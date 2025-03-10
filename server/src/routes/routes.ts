import { Router } from 'express';

import { getLogsAdmins } from '../controllers/controllers.js';

import { authAdmin, authOrganizer } from '../middleware/authRole.js';
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

router.get('/logs/admins', authAdmin, getLogsAdmins);
router.get('/logs/errors', authAdmin, getLogsErrors);
router.delete('/logs/errors', authAdmin, deleteLogError);
router.delete('/logs/admins', authAdmin, deleteLogAdmin);
router.get('/logs/error', authAdmin, getLogError);
router.get('/riders', getRiders);
router.get('/streams', getEnabledUserStreams);
router.get('/moderator/users', authOrganizer, getUsersForModerator);
