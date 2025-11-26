import { Router } from 'express';

import { AssetsController } from '../controllers/Assets.js';

export const assetsRouter = Router();

const assets = new AssetsController();

assetsRouter.get('/routes/all', assets.getAllRoutes);
assetsRouter.get('/routes', assets.get);
