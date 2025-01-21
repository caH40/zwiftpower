import { PasswordReset } from '../../Model/Password-reset.js';
import { handleAndLogError } from '../../errors/error.js';

// types
import { PasswordResetSchema } from '../../types/model.interface.js';

export async function checkRequestPasswordService(tokenReset: string) {
  try {
    const resetPasswordDB = await PasswordReset.findOneAndDelete({
      tokenReset,
    }).lean<PasswordResetSchema>();
    if (!resetPasswordDB) throw { message: 'Не найден запрос на сброс пароля!' };
    const userId = resetPasswordDB.userId;
    await PasswordReset.deleteMany({ userId });

    return {
      message: `Запросы на сброс пароля удалены, ожидается ввод нового пароля`,
      userId,
    };
  } catch (error) {
    handleAndLogError(error);
  }
}
