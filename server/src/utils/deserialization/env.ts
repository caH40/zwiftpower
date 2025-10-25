import { z } from 'zod';

export const EnvZSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production']),
  SERVER_PORT: z.string().regex(/^\d+$/).transform(Number),

  // Database
  MONGODB: z.string(),

  // Frontend
  FRONT: z.string(),
  FRONT_WITHOUT_WWW: z.string(),

  // JWT
  JWT_ACCESS_SECRET: z.string().min(10),
  JWT_REFRESH_SECRET: z.string().min(10),

  // Mail
  MAIL_USER: z.string().email(),
  MAIL_PASS: z.string().min(1),
  MAIL_USER_NOTIFICATION: z.string().email(),
  MAIL_PASS_NOTIFICATION: z.string().min(1),
  MAIL_HOST: z.string().min(1),
  MAIL_PORT: z.string().regex(/^\d+$/).transform(Number),
  MAIL_SECURE: z.enum(['true', 'false']).transform((val) => val === 'true'),

  // APIs
  TWITCH_CLIENT_ID: z.string().min(1),
  TWITCH_CLIENT_SECRET: z.string().min(1),
  YOUTUBE_API_KEY: z.string().min(1),
  YOUTUBE_API_BASE_URL: z.string().url(),

  // Telegram
  TELEGRAM_BOT_HOST: z.string().url(),

  // Zwift
  ZWIFT_API: z.string().url(),
  ZWIFT_SECURE_URL: z.string().url(),
  ZWIFT_USERNAME: z.string().min(1),
  ZWIFT_PASS: z.string().min(1),
  ZWIFT_USERNAME_SECONDARY: z.string().min(1),
  ZWIFT_PASS_SECONDARY: z.string().min(1),

  // Security
  AES_SECRET_KEY: z.string().min(16),

  // VK
  VK_CLIENT_ID: z.string().min(1),

  // VK Cloud AWS
  VK_AWS_CLOUD_ACCESS_ID: z.string().min(1),
  VK_AWS_CLOUD_SECRET_ID: z.string().min(1),
  VK_AWS_REGION: z.string().min(1),
  VK_AWS_ENDPOINT: z.string().url(),
  VK_AWS_BUCKET_NAME: z.string().min(1),
  VK_AWS_ENDPOINT_DOMAIN: z.string(),

  // Yoo Kassa
  YOO_SECRET_KEY: z.string().min(10),
  YOO_SHOP_ID: z.string(),
});
