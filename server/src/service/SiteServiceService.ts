import { millisecondsIn31Days } from '../assets/date.js';
import { handleAndLogError } from '../errors/error.js';
import { Organizer } from '../Model/Organizer.js';
import { PeriodSubscriptionService } from './PeriodSubscriptionService.js';
import { PaidSiteServiceAccessModel } from '../Model/PaidSiteServiceAccess.js';

// types
import { TEntityNameForSlot, TSiteServiceForClient } from '../types/site-service.type.js';
import {
  THandlePeriodUnitParams,
  TManageServiceSlotsParams,
} from '../types/types.interface.js';

/**
 * Сервис работы со слотами по доступу к платным сервисам сайта.
 * Бесплатные сервисы включаются/отключаются простыми флагами и здесь не учитываются.
 */
export class SiteServiceService {
  private subscriptionService: PeriodSubscriptionService;
  constructor() {
    this.subscriptionService = new PeriodSubscriptionService();
  }

  /**
   * Сервис получения всех платных сервисов на сайте.
   */
  public async get(userId: string): Promise<TSiteServiceForClient[]> {
    // Проверка, является ли пользователем Организатором.
    const creatorDB = await Organizer.findOne({ creator: userId }, { _id: true }).lean();

    // Если у пользователя есть активные подписки, тогда исключать данную сущность из списка подписок для покупок, отсылаемого пользователю.
    const hasActiveSubscription = await this.hasActiveSubscription(userId, 'organizer');

    if (hasActiveSubscription) {
      return [];
    }

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
    origin,
    user,
    metadata,
  }: TManageServiceSlotsParams): Promise<void> {
    try {
      const unit = metadata.unit;

      switch (unit) {
        case 'piece':
          this.handlePieceUnit({ purchaseUnit: unit });
          break;

        default:
          {
            await this.handlePeriodUnit({
              origin,
              user,
              metadata: { ...metadata, unit },
            });
          }

          break;
      }
    } catch (error) {
      handleAndLogError(error);
    }
  }

  /**
   * Обработчик успешной оплаты за период-подписку на сервис сайта. Сохранение данных
   * купленной подписке в список слотов пользователя.
   */
  private async handlePeriodUnit({
    origin,
    user,
    metadata,
  }: THandlePeriodUnitParams): Promise<void> {
    const res = await this.subscriptionService.addPeriodSubscription({
      origin,
      user,
      metadata,
    });

    // FIXME: записывать ошибку в платеж, сам платеж возвращать пользователю.
    if (!res.ok) {
      throw new Error(res.message);
    }
  }

  /**
   * Обработчик штучного слота.
   */
  private handlePieceUnit({ purchaseUnit }: { purchaseUnit: 'piece' }) {
    // FIXME: записывать ошибку в платеж, сам платеж возвращать пользователю.
    throw Error(`Нет обработчика для purchaseUnit:${purchaseUnit}`);
  }

  /**
   * Проверяет, есть ли у пользователя активная подписка entityName.
   */
  private async hasActiveSubscription(
    userId: string,
    entityName: TEntityNameForSlot
  ): Promise<boolean> {
    const serviceDB = await PaidSiteServiceAccessModel.findOne({ user: userId }).lean();

    const currentEntity = serviceDB?.services.find((s) => s.entityName === entityName);

    // Если нет сущности сервисов, или нет запрашиваемого сервиса у пользователя.
    if (!currentEntity) {
      return false;
    }

    const now = new Date();

    return currentEntity.periodSlots.some((s) => s.endDate >= now);
  }
}
