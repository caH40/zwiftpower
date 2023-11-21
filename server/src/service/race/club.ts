import { getRequest } from '../zwift/request-get.js';

/**
 * Получение названия клуба из Zwift API
 * @param clubName параметры сохраняемого Even в БД
 * @returns название клуба
 */
export async function getClubName(clubId: string) {
  const urlRiderData = `clubs/club/${clubId}`;
  const clubData = await getRequest(urlRiderData);

  return clubData.name;
}
