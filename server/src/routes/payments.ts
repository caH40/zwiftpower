import { Router } from 'express';

import {
  createPaymentController,
  getOrganizerPaymentPayloadController,
} from '../controllers/payment-service.js';
import { checkAuth } from '../middleware/auth.js';

export const paymentsRouter = Router();

paymentsRouter.post('', createPaymentController);
paymentsRouter.get('/payload/organizer', checkAuth, getOrganizerPaymentPayloadController);
