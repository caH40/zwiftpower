import { User } from '../../Model/User.js';
import { errorHandler } from '../../errors/error.js';
import { refreshProfileService } from '../profile/zwiftid/update-zwiftdata.js';

// types
import { UserSchema } from '../../types/model.interface.js';

/**
 * обновление всех профилей пользователей Users данными с ZwiftApi
 */
export const updateUsers = async (): Promise<void> => {
  try {
    const usersDB: UserSchema[] = await User.find(
      { zwiftId: { $exists: true } },
      { _id: true }
    ).lean();

    for (const user of usersDB) {
      await refreshProfileService(String(user._id)).catch();
    }
  } catch (error) {
    errorHandler(error);
  }
};
