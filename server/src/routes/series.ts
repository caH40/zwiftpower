import { Router } from 'express';
import { SeriesPublicController } from '../controllers/series-public.js';
import { authModeratorClub } from '../middleware/authRole.js';
import { SeriesController } from '../controllers/series.js';

const seriesPublicController = new SeriesPublicController();
const seriesController = new SeriesController();

/**
 * Публичные маршруты для запросов данных по сериям.
 */
export const routerSeries = Router();

routerSeries.get('/organizers/:organizerSlug?', seriesPublicController.getAll);
routerSeries.get('/actual/:organizerId', authModeratorClub, seriesController.getActual);
routerSeries.get('/:urlSlug', seriesPublicController.get);
