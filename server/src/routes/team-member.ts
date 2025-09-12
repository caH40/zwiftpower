import { Router } from 'express';

import { TeamMemberController } from '../controllers/TeamMember.js';

export const teamMemberRouter = Router();

const member = new TeamMemberController();

teamMemberRouter.get('/:urlSlug', member.getAll);
