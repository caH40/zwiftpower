import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSingedRiders } from '../../Model/ZwiftSingedRiders.js';
import { getRequest } from '../zwift/request-get.js';

export async function putSingedRidersService(eventId) {
  try {
    const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');

    for (const eventSubgroup of eventDB.eventSubgroups) {
      // стоит лимит на запрос 100 юзеров, подключенных к заезду в определенной группе
      const singedDataTotal = [];
      let ridersQuantity = 100;
      let start = 0;
      while (ridersQuantity === 100) {
        const urlSingedData = `events/subgroups/entrants/${eventSubgroup.id}/?limit=${ridersQuantity}&participation=signed_up&start=${start}&type=all`;
        const singedData = await getRequest(urlSingedData);
        singedDataTotal.push(...singedData);

        ridersQuantity = singedData.length;
        start += 100;
      }

      // добавление райдеров в группу
      for (const rider of singedDataTotal) {
        await ZwiftSingedRiders.create({
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
      }
    }

    return { message: 'Изменения сохранены' };
  } catch (error) {
    throw error;
  }
}
