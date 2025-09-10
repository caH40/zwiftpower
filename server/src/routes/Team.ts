import { Router } from 'express';
import { TeamController } from '../controllers/Team.js';

export const teamRouter = Router();

const team = new TeamController();

teamRouter.get('/:urlSlug', team.get);
teamRouter.get('/', team.getAll);
