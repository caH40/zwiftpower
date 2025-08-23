import { Types } from 'mongoose';
import { millisecondsIn31Days } from '../assets/date.js';
import { handleAndLogError } from '../errors/error.js';
import { Organizer } from '../Model/Organizer.js';

// types
import { TSiteServiceForClient } from '../types/site-service.type.js';
import { TPurchaseMetadata } from '../types/payment.types.js';

/**
 * Сервис работы со слотами по доступу к платным сервисам сайта.
 * Бесплатные сервисы включаются/отключаются простыми флагами и здесь не учитываются.
 */
export class SiteServiceService {
  constructor() {}

  /**
   * Сервис получения всех платных сервисов на сайте.
   */
  public async get(userId: string): Promise<TSiteServiceForClient[]> {
    // Проверка, является ли пользователем Организатором.
    const creatorDB = await Organizer.findOne({ creator: userId }, { _id: true }).lean();

    const organizerService: TSiteServiceForClient = {
      label: 'Доступ к сервису Организатор',
      entityName: 'organizer',
      description:
        'Доступ к сервисам Организатора. Создание и редактирование заездов через ZwiftAPI. Подписка сроком на 31 день.',
      subscriptionDescription: 'Оплата подписки на месяц.',
      origin: 'purchased',
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().getTime() + millisecondsIn31Days).toISOString(), // +31 день
      price: { unitPrice: 2000, currency: 'RUB' },
    };

    const results: TSiteServiceForClient[] = [];

    // Если пользователь организатор, то в массив сервисов добавляется сервис организатора.
    creatorDB && results.push(organizerService);

    return results;
  }

  /**
   * Обработка данных покупки слотов пользователя. Сохранение деталей покупки через ЮКассу.
   */
  public async manageServiceSlots({
    actionSlot,
    user,
    metadata: { entityName, quantity },
  }: {
    actionSlot: 'purchase' | 'consume' | 'refund';
    user: Types.ObjectId | string;
    metadata: TPurchaseMetadata;
  }): Promise<any> {
    try {
      if (actionSlot !== 'purchase' && quantity > 1) {
        throw new Error(
          `При ${actionSlot} количество изменяемых слотов не может быть больше 1! quantity:${quantity}`
        );
      }
    } catch (error) {
      handleAndLogError(error);
    }
  }
}
