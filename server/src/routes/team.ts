import { Router } from 'express';

import { TeamController } from '../controllers/Team.js';
import { checkAuth } from '../middleware/auth.js';
import { fileMiddleware } from '../middleware/file.js';

export const teamRouter = Router();

const team = new TeamController();

teamRouter.get('/pending-riders', checkAuth, team.getPendingRiders);
teamRouter.get('/banned-riders', checkAuth, team.getBannedRiders);
teamRouter.get('/results/:urlSlug', team.getTeamRiderResults);
teamRouter.get(
  '/rating-results/:teamUrlSlug/:seasonLabel',
  team.getTeamParticipantRatingResults
);
teamRouter.get('/statistics/:urlSlug', team.getTeamStatistics);
teamRouter.get('/:urlSlug', team.get);
teamRouter.get('/', team.getAll);

teamRouter.post('/join-request', checkAuth, team.handleJoinRequest);
teamRouter.post(
  '/',
  checkAuth,
  fileMiddleware([
    { name: 'logoFile', maxCount: 1 },
    { name: 'posterFile', maxCount: 1 },
  ]),
  team.post
);

// put
teamRouter.put(
  '/',
  checkAuth,
  fileMiddleware([
    { name: 'logoFile', maxCount: 1 },
    { name: 'posterFile', maxCount: 1 },
  ]),
  team.put
);
