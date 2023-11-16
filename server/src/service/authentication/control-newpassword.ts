import { PasswordReset } from '../../Model/Password-reset.js';
import { millisecondsInHour } from '../../assets/date.js';
import { errorHandler } from '../../errors/error.js';

/**
 * Контроль времени для смены пароля.
 * При истечении activationPeriod токен для изменения пароля удаляется из БД.
 */
export async function controlNewPasswords() {
  try {
    const requestResetPassword = await PasswordReset.find();
    const dateNow = Date.now();

    // время для смены пароля в миллисекундах
    const activationPeriod = millisecondsInHour;

    for (let i = 0; i < requestResetPassword.length; i++) {
      const expiration = dateNow - requestResetPassword[i].date;
      if (expiration > activationPeriod) {
        await PasswordReset.findOneAndDelete({
          date: requestResetPassword[i].date,
        });
      }
    }
  } catch (error) {
    errorHandler(error);
  }
}
