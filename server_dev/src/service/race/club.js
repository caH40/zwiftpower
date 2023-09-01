import { getRequest } from '../zwift/request-get.js';

export async function getClubName(event) {
  try {
    // если название клуба уже есть в данных эвента, то повторный запрос не делать
    if (event.clubName) return;

    const urlRiderData = `clubs/club/${event.microserviceExternalResourceId}`;
    const clubData = await getRequest(urlRiderData);

    event.clubName = clubData.name;
  } catch (error) {
    throw error;
  }
}
