import { Router } from 'express';
import { SeriesPublicController } from '../controllers/series-public.js';

const seriesPublicController = new SeriesPublicController();

/**
 * Публичные маршруты для запросов данных по сериям.
 */
export const routerSeries = Router();

routerSeries.get('/', seriesPublicController.getAll);
routerSeries.get('/:urlSlug', seriesPublicController.get);
