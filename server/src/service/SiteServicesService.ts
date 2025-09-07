import { handleAndLogError } from '../errors/error.js';
import { Organizer } from '../Model/Organizer.js';
import { PeriodSubscriptionService } from './PeriodSubscriptionService.js';
import { PaidSiteServiceAccessModel } from '../Model/PaidSiteServiceAccess.js';

// types
import {
  TEntityNameForSlot,
  TSiteService,
  TSiteServiceForClient,
  TSubscriptionPeriodSlot,
} from '../types/site-service.type.js';
import {
  THandlePeriodUnitParams,
  TManageServiceSlotsParams,
  TSubscriptionPeriodSlotWithEntity,
} from '../types/types.interface.js';
import { PaymentService } from './Payment.js';

/**
 * Сервис работы со слотами по доступу к платным сервисам сайта.
 * Бесплатные сервисы включаются/отключаются простыми флагами и здесь не учитываются.
 */
export class SiteServicesService {
  private subscriptionService: PeriodSubscriptionService;
  private paymentService: PaymentService;
  constructor() {
    this.subscriptionService = new PeriodSubscriptionService();
    this.paymentService = new PaymentService();
  }

  /**
   * Сервис получения всех доступных платных сервисов на сайте для покупки.
   */
  public async getAllPurchasable(userId: string): Promise<TSiteServiceForClient[]> {
    // Проверка, является ли пользователем Организатором.
    const creatorDB = await Organizer.findOne({ creator: userId }, { _id: true }).lean();

    // Если у пользователя есть активные подписки, тогда исключать данную сущность из списка подписок для покупок, отсылаемого пользователю.
    const hasActiveSubscription = await this.hasActiveSubscription(userId, 'organizer');

    if (hasActiveSubscription) {
      return [];
    }

    // Данные для карточки покупки сервиса Организатор.
    const organizerService = await this.paymentService.getOrganizerServiceCard();

    // Если пользователь организатор, то в массив сервисов добавляется сервис организатора.
    return creatorDB ? organizerService : [];
  }

  /**
   * Обработка данных покупки слотов пользователя. Сохранение деталей покупки через ЮКассу.
   */
  public async manageServiceSlots({
    origin,
    user,
    metadata,
    amount,
    description,
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
              amount,
              description,
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
    amount,
    description,
  }: THandlePeriodUnitParams): Promise<void> {
    const res = await this.subscriptionService.addPeriodSubscription({
      origin,
      user,
      metadata,
      amount,
      description,
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

  /**
   * Метод возвращает все активные и истекшие слоты на сервисы сайта у пользователя.
   */
  public async getAll(userId: string): Promise<{
    expired: TSubscriptionPeriodSlotWithEntity[];
    active: TSubscriptionPeriodSlotWithEntity[];
  }> {
    const servicesDB = await PaidSiteServiceAccessModel.findOne(
      { user: userId },
      { services: true, _id: false }
    ).lean<{ services: TSiteService[] }>();

    if (!servicesDB) {
      return { expired: [], active: [] };
    }

    const now = new Date();
    const slots = servicesDB.services.flatMap<TSubscriptionPeriodSlotWithEntity>(
      (entity, entityIndex) =>
        entity.periodSlots.map((slot, slotIndex) => ({
          id: entityIndex * 10000 + slotIndex,
          entityName: entity.entityName,
          ...slot,
          expired: this.isSlotExpired(slot, now),
        }))
    );

    slots.sort((a, b) => b.endDate.getTime() - a.endDate.getTime());

    const response = slots.reduce<{
      expired: TSubscriptionPeriodSlotWithEntity[];
      active: TSubscriptionPeriodSlotWithEntity[];
    }>(
      (acc, cur) => {
        cur.expired ? acc.expired.push(cur) : acc.active.push(cur);

        return acc;
      },
      { expired: [], active: [] }
    );

    return response;
  }

  /**
   * Проверяет, истёк ли период слота.
   */
  private isSlotExpired(slot: TSubscriptionPeriodSlot, now: Date): boolean {
    return now > slot.endDate;
  }
}
