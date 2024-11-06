import 'dotenv/config';
import nodemailer from 'nodemailer';

import {
  mailPass,
  mailUser,
  mailHost,
  mailPort,
  mailSecure,
} from '../../config/environment.js';
import { errorHandler } from '../../errors/error.js';
import { TMailServiceParams } from '../../types/types.interface.js';

/**
 * Отправка письма на email.
 */
export async function mailService({
  letter,
  subject,
  email,
}: TMailServiceParams): Promise<boolean> {
  try {
    // Инициализация транспортера
    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailSecure,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    // Параметры письма
    const mailOptions = {
      from: mailUser,
      to: email,
      subject,
      html: letter,
    };

    // Отправка письма
    const result = await transporter.sendMail(mailOptions);

    // Проверка статуса отправки
    if (result.accepted.length > 0) {
      return true;
    } else {
      errorHandler(new Error(result.response));
      return false;
    }
  } catch (error) {
    errorHandler(error);
    return false;
  }
}
