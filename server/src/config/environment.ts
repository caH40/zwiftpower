import dotenv from 'dotenv';
import { EnvZSchema } from '../utils/deserialization/env.js';

const { error, parsed } = dotenv.config();

if (error) {
  throw new Error('Не найден файл .env');
}

if (!parsed) {
  throw new Error('Пустой файл .env');
}

export const {
  NODE_ENV: nodeEnvType,
  SERVER_PORT: serverPort,

  MONGODB: mongodb,

  FRONT: serverFront,
  FRONT_WITHOUT_WWW: serverWoWWW,

  JWT_ACCESS_SECRET: jwtAccessSecret,
  JWT_REFRESH_SECRET: jwtRefreshSecret,

  MAIL_USER: mailUser,
  MAIL_PASS: mailPass,
  MAIL_USER_NOTIFICATION: mailUserNotification,
  MAIL_PASS_NOTIFICATION: mailPassNotification,
  MAIL_HOST: mailHost,
  MAIL_PORT: mailPort,
  MAIL_SECURE: mailSecure,

  TWITCH_CLIENT_ID: twitchClientId,
  TWITCH_CLIENT_SECRET: twitchClientSecret,
  YOUTUBE_API_KEY: youtubeAPIKey,
  YOUTUBE_API_BASE_URL: youtubeAPIBaseUrl,

  TELEGRAM_BOT_HOST: telegramBotHost,

  ZWIFT_API: zwiftAPI,
  ZWIFT_SECURE_URL: secureUrl,
  ZWIFT_USERNAME: usernameZwift,
  ZWIFT_PASS: passwordZwift,
  ZWIFT_USERNAME_SECONDARY: usernameZwiftSecondary,
  ZWIFT_PASS_SECONDARY: passwordZwiftSecondary,
  AES_SECRET_KEY: aesSecretKey,
  VK_CLIENT_ID: clientVkID,
  VK_AWS_CLOUD_ACCESS_ID: accessKeyId,
  VK_AWS_CLOUD_SECRET_ID: secretAccessKey,
  VK_AWS_REGION: region,
  VK_AWS_ENDPOINT: endpoint,
  VK_AWS_BUCKET_NAME: bucketName,
  VK_AWS_ENDPOINT_DOMAIN: endpointDomain,
  YOO_SECRET_KEY,
  YOO_SHOP_ID,
} = EnvZSchema.parse(parsed);
