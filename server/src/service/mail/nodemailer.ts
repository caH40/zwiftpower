import 'dotenv/config';
import nodemailer from 'nodemailer';

import { mailHost, mailPort, mailSecure } from '../../config/environment.js';
import { handleAndLogError } from '../../errors/error.js';
import { TMailServiceParams } from '../../types/types.interface.js';

/**
 * Отправка письма на email.
 */
export async function mailService({
  letter,
  subject,
  email,
  auth,
}: TMailServiceParams): Promise<boolean> {
  try {
    // Инициализация транспортера
    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailSecure,
      auth,
    });

    // Параметры письма
    const mailOptions = {
      from: auth.user,
      to: email,
      subject,
      html: letter,
    };

    // Отправка письма.
    const result = await transporter.sendMail(mailOptions);

    // Проверка статуса отправки.
    if (result.accepted.length > 0) {
      // Письмо успешно принято SMTP-сервером.
      return true;
    } else {
      // Письмо не было принято SMTP-сервером.
      const errorMessage = result.response || 'Неизвестная ошибка при отправке письма';
      handleAndLogError(new Error(errorMessage)); // Логируем ошибку.
      return false; // Возвращаем false, чтобы указать на ошибку.
    }
  } catch (error) {
    handleAndLogError(error);
    return false;
  }
}
