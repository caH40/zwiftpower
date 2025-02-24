import { Router } from 'express';

import { authModeratorClub, authOrganizer } from '../middleware/authRole.js';
import {
  addClubModerator,
  deleteClubModerator,
  deleteClubsZwift,
  deleteOrganizerBotZwift,
  getClubsZwift,
  getClubsZwiftForModerator,
  getClubZwift,
  getClubZwiftModerator,
  getOrganizerBotZwift,
  getOrganizersForModerator,
  postClubsZwift,
  putOrganizerBotZwift,
  putOrganizerMain,
} from '../controllers/organizer.js';
import { fileMiddleware } from '../middleware/file.js';
import { SeriesController } from '../controllers/series.js';
import { getEventsForSeries } from '../controllers/race.js';

export const routerOrganizer = Router();

const seriesController = new SeriesController();

routerOrganizer.put('/bots', authOrganizer, putOrganizerBotZwift);
routerOrganizer.get('/bots', authOrganizer, getOrganizerBotZwift);
routerOrganizer.delete('/bots', authOrganizer, deleteOrganizerBotZwift);
routerOrganizer.get('/clubs/:organizerId', authOrganizer, getClubsZwift);
routerOrganizer.get(
  '/clubs-for-moderator/:userModeratorId',
  authModeratorClub,
  getClubsZwiftForModerator
);
routerOrganizer.delete('/clubs', authOrganizer, deleteClubsZwift);
routerOrganizer.get('/clubs/zwift/:clubId', authOrganizer, getClubZwift);
routerOrganizer.post('/clubs/', authOrganizer, postClubsZwift);
routerOrganizer.put('/clubs/moderators', authOrganizer, addClubModerator);
routerOrganizer.delete('/clubs/moderators', authOrganizer, deleteClubModerator);
routerOrganizer.get('/organizers-for-moderator/:userModeratorId', getOrganizersForModerator);
routerOrganizer.put(
  '/main',
  authOrganizer,
  fileMiddleware([
    { name: 'logoFile', maxCount: 1 },
    { name: 'posterFile', maxCount: 1 },
  ]),
  putOrganizerMain
);
routerOrganizer.get('/series', authOrganizer, seriesController.getAll);
routerOrganizer.delete('/series', authOrganizer, seriesController.delete);
routerOrganizer.post(
  '/series',
  authOrganizer,
  fileMiddleware([
    { name: 'logoFile', maxCount: 1 },
    { name: 'posterFile', maxCount: 1 },
  ]),
  seriesController.post
);
routerOrganizer.put(
  '/series',
  authOrganizer,
  fileMiddleware([
    { name: 'logoFile', maxCount: 1 },
    { name: 'posterFile', maxCount: 1 },
  ]),
  seriesController.put
);
routerOrganizer.get('/series/events', authOrganizer, getEventsForSeries);

// Из-за жадного поиска динамический маршрут перенесён в конец модуля.
routerOrganizer.get('/series/:seriesId', authOrganizer, seriesController.get);
routerOrganizer.get('/:organizerId', authOrganizer, getClubZwiftModerator);
