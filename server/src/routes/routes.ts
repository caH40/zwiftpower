import { Router } from 'express';

import { getSeriesActual, getLogsAdmins } from '../controllers/controllers.js';

import { authAdmin, authModerator } from '../middleware/authRole.js';
import {
  getLogsErrors,
  getLogError,
  deleteLogError,
  deleteLogAdmin,
} from '../controllers/logs.js';

export const router = Router();

router.get('/series/actual', authModerator, getSeriesActual); // вроде рабочий
router.get('/logs/admins', authAdmin, getLogsAdmins);
router.get('/logs/errors', authAdmin, getLogsErrors);
router.delete('/logs/errors', authAdmin, deleteLogError);
router.delete('/logs/admins', authAdmin, deleteLogAdmin);
router.get('/logs/error', authAdmin, getLogError);
