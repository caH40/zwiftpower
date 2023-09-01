import { Router } from 'express';

import { getSeriesActual, getLogsAdmins, putUserZwiftId } from '../controllers/controllers.js';

import { authAdmin } from '../middleware/authRole.js';
import { checkAuth } from '../middleware/auth.js';

export const router = Router();

router.get('/series/actual', authAdmin, getSeriesActual); // вроде рабочий
router.get('/logs/admin', authAdmin, getLogsAdmins); // вроде рабочий
router.put('/user', checkAuth, putUserZwiftId); // вроде рабочий
