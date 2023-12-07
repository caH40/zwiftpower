import { PowerCurve } from '../../Model/PowerCurve.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';
import { getRequest } from '../zwift/request-get.js';
import { errorHandler } from '../../errors/error.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';
import { SignedRiderFromZwiftAPI } from '../../types/zwiftAPI/signedRidersFromZwift.interface.js';

/**
 * Получение зарегистрированных райдров с ZwiftApi и сохранение в БД
 */
export async function putSignedRidersService(eventId: number) {
  try {
    const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({
      id: eventId,
    }).populate('eventSubgroups');

    console.log(
      'DB',
      'get eventDB',
      '===',
      new Date().toLocaleDateString(),
      '===',
      eventDB?.name
    );

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
        console.log(
          'ZwiftAPI',
          'signedData',
          '===',
          new Date().toLocaleDateString(),
          '===',
          signedData?.length
        );
        if (!signedData) {
          continue;
        }
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
        console.log(
          'DB',
          'create ZwiftSignedRiders',
          '===',
          new Date().toLocaleDateString(),
          '===',
          'без ответа'
        );
        // добавление кривой мощности зарегистрированного райдера в БД (пустого шаблона)
        await PowerCurve.create({ zwiftId: rider.id, isMale: rider.male }).catch((error) => {
          if (error.code === 11000) return true;
          errorHandler(error);
        });
        console.log(
          'DB',
          'create PowerCurve',
          '===',
          new Date().toLocaleDateString(),
          '===',
          'без ответа'
        );
      }
    }

    return { message: 'Изменения сохранены' };
  } catch (error) {
    errorHandler(error);
  }
}
