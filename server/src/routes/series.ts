import { Router } from 'express';
import { SeriesPublicController } from '../controllers/series-public.js';
import { authModeratorClub } from '../middleware/authRole.js';
import { SeriesOrganizerController } from '../controllers/SeriesOrganizer.js';
import { SeriesStageProtocolManagerController } from '../controllers/SeriesStageProtocolManager.js';
import { checkAuth } from '../middleware/auth.js';

const seriesPublicController = new SeriesPublicController();
const seriesOrganizerController = new SeriesOrganizerController();
const protocolManagersController = new SeriesStageProtocolManagerController();

/**
 * Публичные маршруты для запросов данных по сериям.
 */
export const routerSeries = Router();

routerSeries.get(
  '/general-classification/:urlSlug',
  seriesPublicController.getGeneralClassification
);
routerSeries.get('/stage/results/:urlSlug/:stageOrder', seriesPublicController.getResults);
routerSeries.put('/stage/results', protocolManagersController.updateResultsFromZwift);
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
  protocolManagersController.modifyCategory
);
routerSeries.patch(
  '/stage/results/time-penalty',
  checkAuth,
  protocolManagersController.modifyTimePenalty
);
routerSeries.post(
  '/stage/results/result',
  checkAuth,
  protocolManagersController.addStageResult
);
routerSeries.delete(
  '/stage/results/result',
  checkAuth,
  protocolManagersController.deleteStageResult
);
routerSeries.patch(
  '/stage/results/disqualification/set',
  checkAuth,
  protocolManagersController.setDisqualification
);
routerSeries.patch(
  '/stage/results/disqualification/remove',
  checkAuth,
  protocolManagersController.removeDisqualification
);
