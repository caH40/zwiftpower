import { Router } from 'express';

import { createPaymentController } from '../controllers/payment-service.js';

export const paymentsRouter = Router();

paymentsRouter.post('', createPaymentController);
