import { PowerCurve } from '../../Model/PowerCurve.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';
import { getRequest } from '../zwift/request-get.js';
import { errorHandler } from '../../errors/error.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';
import { SignedRiderFromZwiftAPI } from '../../types/zwiftAPI/signedRidersFromZwift.interface.js';

/**
 * Получение зарегистрированных райдров с ZwiftAPI и сохранение в БД
 */
export async function putSignedRidersService(eventId: number) {
  try {
    const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({
      id: eventId,
    }).populate('eventSubgroups');

    if (!eventDB) {
      throw new Error(`Не найден Event ${eventId} в БД`);
    }

    for (const eventSubgroup of eventDB.eventSubgroups) {
      // стоит лимит на запрос 100 юзеров, подключенных к заезду в определенной группе
      const signedDataTotal = [];
      let ridersQuantity = 100;
      let start = 0;

      while (ridersQuantity === 100) {
        const urlSignedData = `events/subgroups/entrants/${eventSubgroup.id}/?limit=${ridersQuantity}&participation=signed_up&start=${start}&type=all`;
        const signedData: SignedRiderFromZwiftAPI[] | null = await getRequest(urlSignedData);

        // количество зарегистрированных райдеров подсчет которых начинается с позиции start
        ridersQuantity = signedData?.length || 0;
        start += 100;

        if (!signedData) {
          continue;
        }

        signedDataTotal.push(...signedData);
      }
      // добавление райдеров в группу
      for (const rider of signedDataTotal) {
        await ZwiftSignedRiders.create({
          subgroup: eventSubgroup._id,
          id: rider.id,
          firstName: rider.firstName,
          lastName: rider.lastName,
          male: rider.male,
          countryAlpha3: rider.countryAlpha3,
          countryCode: rider.countryCode,
          imageSrc: rider.imageSrc,
          age: rider.age,
          height: rider.height,
          weight: rider.weight,
          subgroupLabel: eventSubgroup.subgroupLabel,
        });

        // добавление кривой мощности зарегистрированного райдера в БД (пустого шаблона)
        await PowerCurve.create({ zwiftId: rider.id, isMale: rider.male }).catch((error) => {
          if (error.code === 11000) return true;
          errorHandler(error);
        });
      }
    }

    return { message: 'Изменения сохранены' };
  } catch (error) {
    errorHandler(error);
  }
}

/**
 * Получение зарегистрированных райдров с ZwiftAPI
 */
export async function getSignedRiders(eventId: number) {
  try {
    const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({
      id: eventId,
    }).populate('eventSubgroups');

    if (!eventDB) {
      throw new Error(`Не найден Event ${eventId} в БД`);
    }

    const signedDataTotal = [];
    for (const eventSubgroup of eventDB.eventSubgroups) {
      // стоит лимит на запрос 100 юзеров, подключенных к заезду в определенной группе

      let ridersQuantity = 100;
      let start = 0;
      while (ridersQuantity === 100) {
        const urlSignedData = `events/subgroups/entrants/${eventSubgroup.id}/?limit=${ridersQuantity}&participation=signed_up&start=${start}&type=all`;
        const signedData: SignedRiderFromZwiftAPI[] | null = await getRequest(urlSignedData);

        if (!signedData) {
          continue;
        }
        signedDataTotal.push(...signedData);

        ridersQuantity = signedData.length;
        start += 100;
      }
    }

    return signedDataTotal;
  } catch (error) {
    errorHandler(error);
  }
}
