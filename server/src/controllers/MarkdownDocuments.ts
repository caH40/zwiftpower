import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { MarkdownDocumentsService } from '../service/MarkdownDocument.js';

/**
 * Контроллер работы с сущностью "Команда".
 */
export class MarkdownDocumentsServiceController {
  documentsService: MarkdownDocumentsService;

  constructor() {
    this.documentsService = new MarkdownDocumentsService();
  }

  /**
   * Список названий файлов и заголовков.
   */
  public getList = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const type = req.params.type as 'development' | 'public' | 'organizer';

      if (!type) {
        return res.status(400).json({ message: 'В запросе не получен type документов!' });
      }

      // Вызов сервиса.
      const response = await this.documentsService.getList(type);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
