import 'dotenv/config';
import nodemailer from 'nodemailer';
import { htmlRegistration } from './letters/registration.js';
import { htmlResetPassword } from './letters/resetpassword.js';
import { htmlRefreshPassword } from './letters/refreshpassword.js';

const { MAIL_USER, MAIL_PASS, MAIL_HOST, MAIL_PORT, MAIL_SECURE, FRONT } = process.env;

export async function mailService(target, token, email, username, password) {
  try {
    let transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: MAIL_SECURE,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    let subject;
    let html;
    const date = new Date().toLocaleString();
    if (target === 'registration') {
      subject = 'Подтверждение регистрации на сайте zwiftpower.ru';
      html = htmlRegistration(username, password, email, token, FRONT, date);
    }
    if (target === 'resetPassword') {
      subject = 'Сброс пароля на сайте zwiftpower.ru';
      html = htmlResetPassword(username, email, token, FRONT, date);
    }
    if (target === 'savedNewPassword') {
      subject = 'Обновление пароля профиля на сайте zwiftpower.ru';
      html = htmlRefreshPassword(date, username, password);
    }

    const from = MAIL_USER;
    const to = email;

    let result = await transporter.sendMail({ from, to, subject, html });

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
