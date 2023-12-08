import { Router } from 'express';

import { getSeriesActual, getLogsAdmins } from '../controllers/controllers.js';

import { authAdmin, authModerator } from '../middleware/authRole.js';
import { getLogsErrors, getLogError } from '../controllers/Logs.js';

export const router = Router();

router.get('/series/actual', authModerator, getSeriesActual); // вроде рабочий
router.get('/logs/admin', authAdmin, getLogsAdmins);
router.get('/logs/errors', authAdmin, getLogsErrors);
router.get('/logs/error', authAdmin, getLogError);
