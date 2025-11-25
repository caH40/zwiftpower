import { Router } from 'express';

import { AssetsController } from '../controllers/Assets.js';

export const assetsRouter = Router();

const assets = new AssetsController();

assetsRouter.get('/routes', assets.get);
