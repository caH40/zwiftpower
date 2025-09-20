import { Router } from 'express';

import { MarkdownDocumentsServiceController } from '../controllers/MarkdownDocuments.js';

export const markdownDocumentsRouter = Router();

const markdownDocuments = new MarkdownDocumentsServiceController();

markdownDocumentsRouter.get('/list/:type', markdownDocuments.getList);
markdownDocumentsRouter.get('/:type/:fileName', markdownDocuments.get);
