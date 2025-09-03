import { Router } from 'express';
import { SiteServicePriceController } from '../controllers/SiteServicePrice.js';

export const siteServicePriceRouter = Router();

const controller = new SiteServicePriceController();

siteServicePriceRouter.get('/', controller.getAll);
