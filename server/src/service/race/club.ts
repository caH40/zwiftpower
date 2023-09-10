import { getRequest } from '../zwift/request-get.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';

/**
 *
 * @param event параметры сохраняемого Even в БД
 * @returns название клуба
 */
export async function getClubName(event: EventWithSubgroup) {
  // если название клуба уже есть в данных эвента, то повторный запрос не делать
  if (event.clubName) {
    return event.clubName;
  }

  const urlRiderData = `clubs/club/${event.microserviceExternalResourceId}`;
  const clubData = await getRequest(urlRiderData);

  return clubData.name;
}
