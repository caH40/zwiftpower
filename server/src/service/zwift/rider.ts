import { ProfileZwiftAPI } from '../../types/zwiftAPI/profileFromZwift.interface.js';
import { getRequest } from './request-get.js';

/**
 *  запрос данных Райдера с сервера Zwift
 */
export async function getZwiftRiderService(zwiftId: number): Promise<ProfileZwiftAPI | null> {
  if (zwiftId === 0) {
    return null;
  }

  const urlRiderData = `profiles/${zwiftId}`;

  // используется secondary zwiftAccessToken, так как все профили открытые для просмотра
  const riderData: ProfileZwiftAPI = await getRequest(urlRiderData, false);

  if (!riderData) {
    throw new Error('Не найден профиль на сервере Zwift');
  }

  return riderData;
}
