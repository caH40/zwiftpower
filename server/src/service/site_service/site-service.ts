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
        'Доступ к сервисам Организатора, создания и редактирования заездов через ZwiftAPI. Подписка сроком на 31 день.',
      subscriptionDescription: 'Оплата подписки на месяц.',
      origin: 'purchased',
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().getTime() + 31 * 24 * 60 * 60 * 1000).toISOString(), // +31 день
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
