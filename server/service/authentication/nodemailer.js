import 'dotenv/config';
import nodemailer from 'nodemailer';

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
			html = `Здравствуйте!<br>
    ${date} была произведена регистрация на сайте zwiftpower.ru, где был указан данный e-mail: <b>${email}</b>.<br>
    Для активации учетной записи перейдите по ссылке <a href="${FRONT}/auth/confirm-email/${token}">${FRONT}/auth/confirm-email/${token}</a> <br><br>
    Логин: ${username}<br>
    Пароль: ${password}<br><br>
    <b>Внимание!</b> Ссылка действительна 72 часа. Без активации аккаунт будет удалён.<br><br>С уважением, команда ZwiftPower.ru`;
		}
		if (target === 'resetPassword') {
			subject = 'Сброс пароля на сайте zwiftpower.ru';
			html = `Здравствуйте!<br>
    ${date} был произведен запрос на сброс пароля для <b>${username}</b> на сайте zwiftpower.ru, где был указан данный e-mail: <b>${email}</b>.<br>
    Для сброса пароля перейдите по ссылке <a href="${FRONT}/auth/new-password/${token}">${FRONT}/auth/password-reset/${token}</a> <br><br>
    <b>Внимание!</b> Ссылка действительна 1 часа. Если Вы не делали данного запроса, то просто проигнорируйте это письмо.<br><br>С уважением, команда ZwiftPower.ru`;
		}
		if (target === 'savedNewPassword') {
			subject = 'Обновление пароля профиля на сайте zwiftpower.ru';
			html = `Здравствуйте!<br>
    ${date} было произведено обновления пароля профиля на сайте zwiftpower.ru<br><br>
    Логин: ${username}<br>
    Новый пароль: ${password}<br><br>
    С уважением, команда ZwiftPower.ru`;
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
