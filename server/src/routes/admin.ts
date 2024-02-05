import { Router } from 'express';

import { authAdmin } from '../middleware/authRole.js';
import { getClubs, getClub, getUsers, postClub, deleteClub } from '../controllers/admin.js';

export const routerAdmin = Router();

routerAdmin.get('/users', authAdmin, getUsers);
routerAdmin.get('/clubs', authAdmin, getClubs);
routerAdmin.get('/clubs/:id', authAdmin, getClub);
routerAdmin.post('/clubs', authAdmin, postClub);
routerAdmin.delete('/clubs', authAdmin, deleteClub);
