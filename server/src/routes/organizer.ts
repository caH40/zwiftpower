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

export const routerOrganizer = Router();

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
routerOrganizer.get('/:organizerId', authOrganizer, getClubZwiftModerator);
routerOrganizer.get('/organizers-for-moderator/:userModeratorId', getOrganizersForModerator);
routerOrganizer.put(
  '/main',
  authOrganizer,
  fileMiddleware([
    { name: 'logoFile', maxCount: 1 },
    { name: 'backgroundImageFile', maxCount: 1 },
  ]),
  putOrganizerMain
);
