import { Router } from 'express';

import {} from '../controllers/organizer.js';
import { getOrganizerPublic, getOrganizersPublic } from '../controllers/organizer-public.js';

export const routerOrganizerPublic = Router();

routerOrganizerPublic.get('/', getOrganizersPublic);
routerOrganizerPublic.get('/:organizerId', getOrganizerPublic);
