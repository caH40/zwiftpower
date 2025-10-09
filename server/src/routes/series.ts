import { Router } from 'express';
import { SeriesPublicController } from '../controllers/series-public.js';
import { authModeratorClub } from '../middleware/authRole.js';
import { SeriesOrganizerController } from '../controllers/SeriesOrganizer.js';
import { SeriesResultsController } from '../controllers/SeriesResults.js';
import { checkAuth } from '../middleware/auth.js';

const seriesPublicController = new SeriesPublicController();
const seriesOrganizerController = new SeriesOrganizerController();
const seriesResultsController = new SeriesResultsController();

/**
 * Публичные маршруты для запросов данных по сериям.
 */
export const routerSeries = Router();

routerSeries.get(
  '/general-classification/:urlSlug',
  seriesPublicController.getGeneralClassification
);
routerSeries.get('/stage/results/:urlSlug/:stageOrder', seriesPublicController.getResults);
routerSeries.put('/stage/results', seriesResultsController.updateResultsFromZwift);
routerSeries.get('/organizers/:organizerSlug?', seriesPublicController.getAll);
routerSeries.get(
  '/actual/:organizerId',
  authModeratorClub,
  seriesOrganizerController.getActual
);
routerSeries.get('/stages/:urlSlug/:status', seriesPublicController.getStages);

routerSeries.get('/:urlSlug', seriesPublicController.get);

routerSeries.patch(
  '/stage/results/category',
  checkAuth,
  seriesResultsController.modifyCategory
);
