import { DAYS_IN_MONTH_FOR_SLOT } from '../assets/constants.js';
import { PaidSiteServiceAccessModel } from '../Model/PaidSiteServiceAccess.js';

// types
import { TPaidSiteServiceAccessDocument } from '../types/model.interface.js';
import { TPurchaseUnit } from '../types/payment.types.js';
import {
  TEntityNameForSlot,
  TSlotOrigin,
  TSubscriptionPeriodSlot,
} from '../types/site-service.type.js';
import { THandlePeriodUnitParams } from '../types/types.interface.js';

export class SubscriptionService {
  constructor(private model: typeof PaidSiteServiceAccessModel) {}

  /**
   * Вычисляет дату окончания подписки в зависимости от unit (month/week/day).
   */
  private getEndDateByUnit(unit: Exclude<TPurchaseUnit, 'piece'>): Date {
    const now = new Date();

    const daysByUnit: Record<Exclude<TPurchaseUnit, 'piece'>, number> = {
      month: DAYS_IN_MONTH_FOR_SLOT,
      week: 7,
      day: 1,
    };

    const daysToAdd = daysByUnit[unit];

    // Считаем конец дня через daysToAdd дней.
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + daysToAdd, // Прибавляем дни купленной подписки.
      23,
      59,
      59,
      999 // Конец дня.
    );

    return endDate;
  }

  /**
   * Создаёт объект слота подписки (period slot).
   */
  private createPeriodSlot(
    origin: TSlotOrigin,
    startDate: Date,
    endDate: Date
  ): TSubscriptionPeriodSlot {
    return {
      description: 'Описание слота',
      isPaused: false,
      origin,
      startDate,
      endDate,
    };
  }

  /**
   * Проверяет, есть ли у сущности активная подписка (endDate >= now).
   */
  private hasActiveSubscription(
    entity: { periodSlots: TSubscriptionPeriodSlot[] },
    now: Date
  ): boolean {
    return entity.periodSlots.some((s) => s.endDate >= now);
  }

  /**
   * Создаёт новую запись в БД с сервисом и слотом.
   */
  private async createNewService(
    user: string,
    entityName: TEntityNameForSlot,
    slot: TSubscriptionPeriodSlot
  ) {
    const service = new this.model({
      user,
      services: [{ entityName, periodSlots: [slot], pieceSlots: [] }],
    });
    await service.save();
  }

  /**
   * Добавляет новый сервис к существующей записи в БД.
   */
  private addServiceToExisting(
    serviceDB: TPaidSiteServiceAccessDocument,
    entityName: TEntityNameForSlot,
    slot: TSubscriptionPeriodSlot
  ) {
    serviceDB.services.push({ entityName, periodSlots: [slot], pieceSlots: [] });
  }

  /**
   * Основной метод: добавляет подписку на сервис (month/week/day).
   * Создаёт запись, добавляет сервис или расширяет существующий слот.
   */
  async addPeriodSubscription({
    origin,
    user,
    metadata,
  }: THandlePeriodUnitParams): Promise<{ ok: boolean; message: string }> {
    const serviceDB = await this.model.findOne({ user });
    const startDate = new Date();
    const endDate = this.getEndDateByUnit(metadata.unit);
    const newPeriodSlot = this.createPeriodSlot(origin, startDate, endDate);

    const successResponse = { ok: true, message: 'Подписка успешно активирована' };

    if (!serviceDB) {
      await this.createNewService(user.toString(), metadata.entityName, newPeriodSlot);
      return successResponse;
    }

    const currentEntity = serviceDB.services.find((s) => s.entityName === metadata.entityName);

    if (!currentEntity) {
      this.addServiceToExisting(serviceDB, metadata.entityName, newPeriodSlot);
      await serviceDB.save();
      return successResponse;
    }

    if (this.hasActiveSubscription(currentEntity, startDate)) {
      return {
        ok: false,
        message: `Есть активная подписка на сервис ${metadata.entityName} у пользователя с _id: ${user}`,
      };
    }

    currentEntity.periodSlots.push(newPeriodSlot);
    await serviceDB.save();
    return successResponse;
  }
}
