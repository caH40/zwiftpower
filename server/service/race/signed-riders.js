import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';
import { getRequest } from '../zwift/request-get.js';

export async function putSignedRidersService(eventId) {
  try {
    const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');

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
      }
    }

    return { message: 'Изменения сохранены' };
  } catch (error) {
    throw error;
  }
}
