import 'dotenv/config';
import nodemailer from 'nodemailer';

import { htmlRegistration } from './letters/registration.js';
import { htmlResetPassword } from './letters/resetpassword.js';
import { htmlRefreshPassword } from './letters/refreshpassword.js';
import {
  mailPass,
  mailUser,
  mailHost,
  mailPort,
  mailSecure,
  serverFront,
} from '../../config/environment.js';

export async function mailService(
  target: string,
  token: string,
  email: string,
  username: string,
  password?: string
) {
  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: mailSecure,
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

  // создание соответствующего письма
  const mailContent = {} as { subject: string; html: string };
  const date = new Date().toLocaleString();
  if (target === 'registration' && password) {
    mailContent.subject = 'Подтверждение регистрации на сайте zwiftpower.ru';
    mailContent.html = htmlRegistration(username, password, email, token, serverFront, date);
  } else if (target === 'resetPassword') {
    mailContent.subject = 'Сброс пароля на сайте zwiftpower.ru';
    mailContent.html = htmlResetPassword(username, email, token, serverFront, date);
  } else if (target === 'savedNewPassword' && password) {
    mailContent.subject = 'Обновление пароля профиля на сайте zwiftpower.ru';
    mailContent.html = htmlRefreshPassword(date, username, password);
  } else {
    mailContent.subject = 'Возникли проблемы с отправкой почты с zwiftpower.ru';
  }

  const from = mailUser;
  const to = email;

  const result = await transporter.sendMail({
    from,
    to,
    subject: mailContent.subject,
    html: mailContent.html,
  });

  if (result.response.includes('250 OK')) {
    return true;
  } else {
    return false;
  }
}
