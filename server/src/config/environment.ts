import dotenv from 'dotenv';

const { error, parsed } = dotenv.config();

if (error) {
  throw new Error('Не найден файл .env');
}

if (!parsed) {
  throw new Error('Пустой файл .env');
}

export const mongodb: string = parsed.MONGODB;
export const server: string = parsed.FRONT;
export const jwtAccessSecret: string = parsed.JWT_ACCESS_SECRET;
export const jwtRefreshSecret: string = parsed.JWT_REFRESH_SECRET;
export const mailUser: string = parsed.MAIL_USER;
export const mailPass: string = parsed.MAIL_PASS;
export const mailHost: string = parsed.MAIL_HOST;
export const mailPort: number = +parsed.MAIL_PORT;
export const mailSecure: boolean = parsed.MAIL_SECURE === 'true' ? true : false;
export const serverFront: string = parsed.FRONT;
export const telegramBotHost: string = parsed.TELEGRAM_BOT_HOST;
export const zwiftAPI: string = parsed.ZWIFT_API;
export const secureUrl: string = parsed.ZWIFT_SECURE_URL;
export const usernameZwift: string = parsed.ZWIFT_USERNAME;
export const passwordZwift: string = parsed.ZWIFT_PASS;
export const usernameZwiftSecondary: string = parsed.ZWIFT_USERNAME_SECONDARY;
export const passwordZwiftSecondary: string = parsed.ZWIFT_PASS_SECONDARY;
