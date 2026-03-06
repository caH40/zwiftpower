import { handleAndLogError } from '../../errors/error.js';
import { ProfileZwiftAPI } from '../../types/zwiftAPI/profileFromZwift.interface.js';
import { getRequest } from './api/request-get.js';
import { addInvalidZwiftId } from './invalid_zwift_id/add.js';
import { checkZwiftId } from './invalid_zwift_id/check.js';

/**
 *  запрос данных Райдера с сервера Zwift
 */
export async function getZwiftRiderService(zwiftId: number): Promise<ProfileZwiftAPI | null> {
  if (zwiftId === 0) {
    return null;
  }

  const urlRiderData = `profiles/${zwiftId}`;

  const riderData: ProfileZwiftAPI = await getRequest({ url: urlRiderData });

  // Если профиль не найден, то добавляем его в список невалидных zwiftId,
  // для исключения ошибочных запросов на api
  if (!riderData) {
    const zwiftIdExisted = await checkZwiftId(zwiftId);

    if (zwiftIdExisted) {
      handleAndLogError(
        new Error(
          `Не найден профиль на сервере Zwift. ZwiftId:${zwiftId} уже добавлен в список InvalidZwiftId.`
        )
      );
      return null;
    }

    await addInvalidZwiftId(zwiftId);
    handleAndLogError(new Error('Не найден профиль на сервере Zwift'));
    return null;
  }

  return riderData;
}
