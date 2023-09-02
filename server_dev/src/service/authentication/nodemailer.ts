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
  try {
    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailSecure,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    let subject;
    let html;
    const date = new Date().toLocaleString();
    if (target === 'registration' && password) {
      subject = 'Подтверждение регистрации на сайте zwiftpower.ru';
      html = htmlRegistration(username, password, email, token, serverFront, date);
    } else if (target === 'resetPassword') {
      subject = 'Сброс пароля на сайте zwiftpower.ru';
      html = htmlResetPassword(username, email, token, serverFront, date);
    } else if (target === 'savedNewPassword' && password) {
      subject = 'Обновление пароля профиля на сайте zwiftpower.ru';
      html = htmlRefreshPassword(date, username, password);
    } else {
      subject = 'Возникли проблемы с отправкой почты с zwiftpower.ru';
    }

    const from = mailUser;
    const to = email;

    const result = await transporter.sendMail({ from, to, subject, html });

    console.log('Message sent: %s', result.messageId);

    if (result.response.includes('250 OK')) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error;
  }
}
