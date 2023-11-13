import { Router } from 'express';

import { authAdmin } from '../middleware/authRole.js';
import { getUsers } from '../controllers/admin.js';

export const routerAdmin = Router();

routerAdmin.get('/users', authAdmin, getUsers);
