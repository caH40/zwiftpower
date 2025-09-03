import { dtoTSiteServicePrice } from '../dto/site-service-price.js';
import { SiteServicePriceModel } from '../Model/SiteServicePrice.js';

// types
import { TSiteServicePrice } from '../types/model.interface.js';
import { TSiteServicePriceDto } from '../types/dto.interface.js';

/**
 * Класс работы с прайсом цен на сервисы сайта.
 */
export class SiteServicePriceService {
  constructor() {}

  async getAll(): Promise<TSiteServicePriceDto[]> {
    const priceDB = await SiteServicePriceModel.find().lean<TSiteServicePrice[]>();

    return priceDB.map((item) => dtoTSiteServicePrice(item));
  }
}
