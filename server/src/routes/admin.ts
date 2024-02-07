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
} from '../controllers/admin.js';

export const routerAdmin = Router();

routerAdmin.get('/users', authAdmin, getUsers);
routerAdmin.get('/clubs', authModerator, getClubs);
routerAdmin.get('/clubs/:id', authAdmin, getClub);
routerAdmin.post('/clubs', authAdmin, postClub);
routerAdmin.delete('/clubs', authAdmin, deleteClub);
routerAdmin.put('/clubs/moderators', authAdmin, addClubModerator);
routerAdmin.delete('/clubs/moderators', authAdmin, deleteClubModerator);
