import { Router } from 'express';
import {
  deleteDevelopment,
  getDevelopment,
  postDevelopment,
  putDevelopment,
} from '../controllers/information.js';
import { authAdmin } from '../middleware/authRole.js';

export const routerInformation = Router();

routerInformation.get('/development', getDevelopment);
routerInformation.post('/development', authAdmin, postDevelopment);
routerInformation.put('/development', authAdmin, putDevelopment);
routerInformation.delete('/development', authAdmin, deleteDevelopment);
