import { Request, Response } from 'express';

import { SiteServicePriceService } from '../service/SiteServicePrice.js';
import { handleErrorInController } from '../errors/error.js';

// types

/**
 * Контроллер работы с прайсом цен на сервисы сайта.
 */
export class SiteServicePriceController {
  private priceService: SiteServicePriceService;

  constructor() {
    this.priceService = new SiteServicePriceService();
  }

  public getAll = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // Вызов сервиса.
      const response = await this.priceService.getAll();

      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
