import { Router } from 'express';

// import { authOrganizer } from '../middleware/authRole.js';
import { getNSeries, getNSeriesCurrent } from '../controllers/series.js';

export const routerSeries = Router();

routerSeries.get('/', getNSeries);
routerSeries.get('/urlSlug', getNSeriesCurrent);
