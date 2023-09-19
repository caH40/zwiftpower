import { User } from '../../Model/User.js';
import { UserConfirm } from '../../Model/User-confirm.js';
import { errorHandler } from '../../errors/error.js';

export async function controlConfirmEmail() {
  try {
    const usersForConfirmDB = await UserConfirm.find();
    const dateNow = Date.now();

    const activationPeriod = 3 * 24 * 60 * 60 * 1000;

    for (let i = 0; i < usersForConfirmDB.length; i++) {
      const expiration = dateNow - usersForConfirmDB[i].date;

      if (expiration > activationPeriod) {
        const { userId } = usersForConfirmDB[i];
        await UserConfirm.findOneAndDelete({ userId });
        const userDeleted = await User.findOneAndDelete({ _id: userId });

        if (!userDeleted) {
          throw new Error(`Не найден аккаунт _id:${userId} для удаления`);
        }
      }
    }
  } catch (error) {
    errorHandler(error);
  }
}
