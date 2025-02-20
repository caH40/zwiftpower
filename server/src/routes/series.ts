import { Router } from 'express';

// import { authOrganizer } from '../middleware/authRole.js';
import { SeriesController } from '../controllers/series.js';

export const routerSeries = Router();

const seriesController = new SeriesController();

routerSeries.get('/', seriesController.getAll);
routerSeries.get('/urlSlug', seriesController.get);
