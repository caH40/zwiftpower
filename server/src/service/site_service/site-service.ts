import { millisecondsIn31Days } from '../../assets/date.js';
import { handleAndLogError } from '../../errors/error.js';
import { Organizer } from '../../Model/Organizer.js';

// types
import { TSiteServiceForClient } from '../../types/site-service.type.js';

/**
 * Сервис получения всех платных сервисов на сайте.
 */
export async function getSiteServicesService(userId: string): Promise<TSiteServiceForClient[]> {
  try {
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
  } catch (error) {
    handleAndLogError(error);
    return [];
  }
}
