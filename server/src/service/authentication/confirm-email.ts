import { UserConfirm } from '../../Model/User-confirm.js';
import { User } from '../../Model/User.js';
import { handleAndLogError } from '../../errors/error.js';

// types
import { UserConfirmSchema } from '../../types/model.interface.js';

export async function confirmEmailService(activationToken: string) {
  try {
    const userConfirmDB = await UserConfirm.findOneAndDelete({
      activationToken,
    }).lean<UserConfirmSchema>();

    if (userConfirmDB) {
      await User.findOneAndUpdate(
        { _id: userConfirmDB.userId },
        { $set: { emailConfirm: true } }
      );
      return { message: `Email подтверждён, аккаунт активирован!` };
    }

    return { message: `Ссылка для активации устарела!` };
  } catch (error) {
    handleAndLogError(error);
  }
}
