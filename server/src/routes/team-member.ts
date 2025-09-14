import { Router } from 'express';

import { TeamMemberController } from '../controllers/TeamMember.js';
import { checkAuth } from '../middleware/auth.js';

export const teamMemberRouter = Router();

const member = new TeamMemberController();

teamMemberRouter.get('/:urlSlug', member.getAll);

teamMemberRouter.post('/leave', checkAuth, member.leave);
teamMemberRouter.post('/', checkAuth, member.controlMembers);
