import { User } from '../../Model/User.js';
import { UserConfirm } from '../../Model/User-confirm.js';
import { errorHandler } from '../../errors/error.js';
import { millisecondsIn3Days } from '../../assets/date.js';

/**
 * Проверка подтверждения e-mail (активация аккаунта).
 * Подтверждение должно произойти в течении activationPeriod после регистрации.
 * Без подтверждения аккаунт удаляется из БД.
 */
export async function controlConfirmEmail() {
  try {
    const usersForConfirmDB = await UserConfirm.find();
    const dateNow = Date.now();

    // время для подтверждения e-mail в миллисекундах
    const activationPeriod = millisecondsIn3Days;

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
