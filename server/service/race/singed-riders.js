import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSingedRiders } from '../../Model/ZwiftSingedRiders.js';
import { getRequest } from '../zwift/request-get.js';

export async function putSingedRidersService(eventId) {
  try {
    const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');

    for (const eventSubgroup of eventDB.eventSubgroups) {
      // стоит лимит на запрос 100 юзеров, подключенных к заезду в определенной группе
      const urlSingedData = `events/subgroups/entrants/${eventSubgroup.id}/?limit=100&participation=signed_up&start=0&type=all`;
      const singedData = await getRequest(urlSingedData);
      // удаление всех зарегистрированных райдеров из группы
      await ZwiftSingedRiders.deleteMany({ subgroup: eventSubgroup._id });
      // добавление райдеров в группу
      for (const rider of singedData) {
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
