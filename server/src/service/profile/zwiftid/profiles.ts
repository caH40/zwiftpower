import { User } from '../../../Model/User.js';
import { errorHandler } from '../../../errors/error.js';
import { refreshProfileService } from './update-zwiftdata.js';

// !!! Удалить данный сервис!!!
// !!! Удалить данный сервис!!!
// !!! Удалить данный сервис!!!
/**
 * Обновление данных из Звифта zwiftData в профилях зарегистрированных пользователей,
 * которые финишировали в заезде
 */
export async function updateZwiftDataInProfiles(zwiftIds: number[]): Promise<void> {
  try {
    const usersDB = await User.find({ zwiftId: zwiftIds }).lean();

    for (const user of usersDB) {
      await refreshProfileService(String(user._id)).catch((error) => errorHandler(error));
    }
  } catch (error) {
    errorHandler(error);
  }
}
