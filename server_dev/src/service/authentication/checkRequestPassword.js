import { PasswordReset } from '../../Model/Password-reset.js';

export async function checkRequestPasswordService(tokenReset) {
	try {
		const resetPasswordDB = await PasswordReset.findOneAndDelete({ tokenReset });
		if (!resetPasswordDB) throw { message: 'Не найден запрос на сброс пароля!' };
		const userId = resetPasswordDB.userId;
		await PasswordReset.deleteMany({ userId });

		return {
			message: `Запросы на сброс пароля удалены, ожидается ввод нового пароля`,
			userId,
		};
	} catch (error) {
		throw error;
	}
}
