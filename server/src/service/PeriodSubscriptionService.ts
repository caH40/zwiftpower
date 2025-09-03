import { Types } from 'mongoose';

import { Club } from '../Model/Club.js';
import { DAYS_IN_MONTH_FOR_SLOT } from '../assets/constants.js';
import { PaidSiteServiceAccessModel } from '../Model/PaidSiteServiceAccess.js';
import { handleAndLogError } from '../errors/error.js';

// types
import {
  TPaidSiteServiceAccess,
  TPaidSiteServiceAccessDocument,
} from '../types/model.interface.js';
import { TCurrency, TPurchaseUnit } from '../types/payment.types.js';
import {
  TEntityNameForSlot,
  TSlotOrigin,
  TSubscriptionPeriodSlot,
} from '../types/site-service.type.js';
import { THandlePeriodUnitParams } from '../types/types.interface.js';

/**
 * Класс работы с сервисами сайта на основе подписки на временной период использования.
 */
export class PeriodSubscriptionService {
  constructor() {}

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
  private createPeriodSlot({
    origin,
    startDate,
    endDate,
    amount,
    description,
  }: {
    origin: TSlotOrigin;
    startDate: Date;
    endDate: Date;
    amount: { value: number; currency: TCurrency };
    description: string;
  }): TSubscriptionPeriodSlot {
    return {
      description,
      isPaused: false,
      origin,
      startDate,
      endDate,
      amount,
    };
  }

  /**
   * Проверка активной подписки у Организаторов соответствующих клубов.
   * Возвращение актуальных клубов.
   */
  public async getClubsWithActiveOrganizerSubscription(clubs: string[]): Promise<string[]> {
    try {
      const result = [] as string[];
      const now = new Date();

      const clubsDB = await Club.find(
        { id: { $in: clubs } },
        { _id: false, id: true, organizer: true }
      )
        .populate({ path: 'organizer', select: ['creator', '-_id'] })
        .lean<{ id: string; organizer: { creator: Types.ObjectId } }[]>();

      const organizersIds = clubsDB.map((c) => c.organizer.creator);

      const servicesDB = await PaidSiteServiceAccessModel.find({
        user: { $in: organizersIds },
      }).lean<TPaidSiteServiceAccess[]>();

      const servicesMap = new Map(
        servicesDB.map(({ user, services }) => [user.toString(), services])
      );

      // Запрос данных по слотам у организаторов.
      for (const club of clubsDB) {
        const services = servicesMap.get(club.organizer.creator.toString());
        const periodSlots = services?.find((s) => s.entityName === 'organizer');

        if (periodSlots && this.hasActiveSubscription(periodSlots, now)) {
          result.push(club.id);
        }
      }

      return result;
    } catch (error) {
      handleAndLogError(error);
      return [];
    }
  }

  /**
   * Проверка есть ли у пользователя userId который является модератором у организатора organizerId или организатором активная подписка на сервис entityName:organizer.
   */

  // Данные пользователя, являющегося модератором в клубе
  //   {
  //   username: 'caH4077',
  //   email: 'info@zwiftpower.ru',
  //   id: '68b7d5fe79e9c8319d56b45e',
  //   role: 'user',
  //   photoProfile: null,
  //   zwiftId: 678687,
  //   moderator: { clubs: [ '53fb86b7-1702-42f1-8b42-a37a7007ce72' ] },
  //   externalAccounts: {},
  //   iat: 1756878430,
  //   exp: 1756964830
  // }

  /**
   * Проверяет, есть ли у сущности активная подписка (endDate >= now).
   */
  public hasActiveSubscription(
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
    const service = new PaidSiteServiceAccessModel({
      user,
      services: [{ entityName, periodSlots: [slot] }],
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
    serviceDB.services.push({ entityName, periodSlots: [slot] });
  }

  /**
   * Основной метод: добавляет подписку на сервис (month/week/day).
   * Создаёт запись, добавляет сервис или расширяет существующий слот.
   */
  async addPeriodSubscription({
    origin,
    user,
    metadata,
    amount,
    description,
  }: THandlePeriodUnitParams): Promise<{ ok: boolean; message: string }> {
    const serviceDB = await PaidSiteServiceAccessModel.findOne({ user });
    const startDate = new Date();
    const endDate = this.getEndDateByUnit(metadata.unit);
    const newPeriodSlot = this.createPeriodSlot({
      origin,
      startDate,
      endDate,
      amount,
      description,
    });

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
