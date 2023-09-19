import { PasswordReset } from '../../Model/Password-reset.js';
import { errorHandler } from '../../errors/error.js';

export async function controlNewPasswords() {
  try {
    const requestResetPassword = await PasswordReset.find();
    const dateNow = Date.now();

    const activationPeriod = 3600;

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
