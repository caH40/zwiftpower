import { v4 as uuidv4 } from 'uuid';

import { PasswordReset } from '../../Model/Password-reset.js';
import { User } from '../../Model/User.js';
import { mailService } from './nodemailer.js';
import { errorHandler } from '../../errors/error.js';

export async function resetPasswordService(email: string) {
  try {
    const userDB = await User.findOne({ email });
    if (!userDB) throw { message: 'e-mail не найден' };

    const tokenReset = uuidv4();
    await PasswordReset.create({
      userId: userDB._id,
      email,
      tokenReset,
      date: Date.now(),
    });

    const target = 'resetPassword';
    await mailService(target, tokenReset, email, userDB.username);

    return { message: `Сброс пароля `, email };
  } catch (error) {
    errorHandler(error);
  }
}
