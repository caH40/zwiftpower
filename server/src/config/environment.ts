import dotenv from 'dotenv';

const { error, parsed } = dotenv.config();

if (error) {
  throw new Error('Не найден файл .env');
}

if (!parsed) {
  throw new Error('Пустой файл .env');
}

export const nodeEnvType: string = parsed.NODE_ENV;
export const serverPort: string = parsed.SERVER_PORT;
export const serverUpdatePort: string = parsed.SERVER_UPDATE_PORT;
export const mongodb: string = parsed.MONGODB;
export const server: string = parsed.FRONT;
export const serverWoWWW: string = parsed.FRONT_WITHOUT_WWW;
export const jwtAccessSecret: string = parsed.JWT_ACCESS_SECRET;
export const jwtRefreshSecret: string = parsed.JWT_REFRESH_SECRET;
export const mailUser: string = parsed.MAIL_USER;
export const mailPass: string = parsed.MAIL_PASS;

export const mailUserNotification: string = parsed.MAIL_USER_NOTIFICATION;
export const mailPassNotification: string = parsed.MAIL_PASS_NOTIFICATION;

export const twitchClientId: string = parsed.TWITCH_CLIENT_ID;
export const twitchClientSecret: string = parsed.TWITCH_CLIENT_SECRET;

export const youtubeAPIKey: string = parsed.YOUTUBE_API_KEY;
export const youtubeAPIBaseUrl: string = parsed.YOUTUBE_API_BASE_URL;

export const mailHost: string = parsed.MAIL_HOST;
export const mailPort: number = +parsed.MAIL_PORT;
export const mailSecure: boolean = parsed.MAIL_SECURE === 'true';
export const serverFront: string = parsed.FRONT;
export const telegramBotHost: string = parsed.TELEGRAM_BOT_HOST;
export const zwiftAPI: string = parsed.ZWIFT_API;
export const secureUrl: string = parsed.ZWIFT_SECURE_URL;
export const usernameZwift: string = parsed.ZWIFT_USERNAME;
export const passwordZwift: string = parsed.ZWIFT_PASS;
export const usernameZwiftSecondary: string = parsed.ZWIFT_USERNAME_SECONDARY;
export const passwordZwiftSecondary: string = parsed.ZWIFT_PASS_SECONDARY;

export const aesSecretKey: string = parsed.AES_SECRET_KEY;

// id приложения в VK для авторизации.
export const clientVkID: string = parsed.VK_CLIENT_ID;

// Данные из переменных окружения для Cloud VK  aws-sdk
export const accessKeyId: string = parsed.VK_AWS_CLOUD_ACCESS_ID;
export const secretAccessKey: string = parsed.VK_AWS_CLOUD_SECRET_ID;
export const region: string = parsed.VK_AWS_REGION;
export const endpoint: string = parsed.VK_AWS_ENDPOINT;
export const bucketName: string = parsed.VK_AWS_BUCKET_NAME;
export const endpointDomain: string = parsed.VK_AWS_ENDPOINT_DOMAIN;

/**
 * Данные YooKassa.
 */
export function getYooKassaConfig() {
  if (!parsed) {
    throw new Error('Пустой файл .env');
  }

  const secretKey: string = parsed.YOO_SECRET_KEY;
  const shopId: string = parsed.YOO_SHOP_ID;

  if (!secretKey || !shopId) {
    throw new Error('Не получены данные конфигурации для yookassa');
  }

  return { secretKey, shopId };
}
