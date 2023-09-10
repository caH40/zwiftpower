import { PowerCurve } from '../../Model/PowerCurve.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';
import { getRequest } from '../zwift/request-get.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';

/**
 * Получение зарегистрированных райдров с ZwiftApi и сохранение в БД
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
        const signedData = await getRequest(urlSignedData);
        signedDataTotal.push(...signedData);

        ridersQuantity = signedData.length;
        start += 100;
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
        await PowerCurve.create({ zwiftId: rider.id }).catch((error) => {
          if (error.code === 11000) return true;
          console.log(error);
        });
      }
    }

    return { message: 'Изменения сохранены' };
  } catch (error) {
    console.log(error);
  }
}
