import { Router } from 'express';

import { authOrganizer } from '../middleware/authRole.js';
import { SeriesController } from '../controllers/series.js';
import { fileMiddleware } from '../middleware/file.js';

export const routerSeries = Router();

const seriesController = new SeriesController();

routerSeries.get('/', seriesController.getAll);
routerSeries.get('/urlSlug', seriesController.get);
routerSeries.post(
  '/',
  authOrganizer,
  fileMiddleware([
    { name: 'logoFile', maxCount: 1 },
    { name: 'posterFile', maxCount: 1 },
  ]),
  seriesController.post
);
