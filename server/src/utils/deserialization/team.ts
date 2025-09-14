import { z } from 'zod';
import { preprocessCB } from './utils.js';

export const ContactZSchema = z.object({
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\+?\d{7,15}$/)
    .optional(),
});

export const TelegramZSchema = z.object({
  group: z.string().optional().describe('Группа в Telegram'),
  channel: z.string().optional().describe('Канал в Telegram'),
});

export const SocialLinksZSchema = z.object({
  vk: z.string().url().optional().describe('Ссылка на профиль или группу ВКонтакте'),
  facebook: z.string().url().optional().describe('Ссылка на профиль или страницу Facebook'),
  twitter: z.string().url().optional().describe('Ссылка на аккаунт Twitter'),
  instagram: z.string().url().optional().describe('Ссылка на аккаунт Instagram'),
  youtube: z.string().url().optional().describe('Ссылка на канал YouTube'),
});

export const TeamZSchema = z.object({
  _id: z.string().optional().describe('_id изменяемой команды в БД'),
  name: z.string().min(2).describe('Название'),
  shortName: z.string().min(2).describe('Короткое название'),
  mission: z.string().optional().describe('Цель'),
  description: z.string().optional().describe('Описание'),
  country: z.string().optional().describe('Страна'),
  website: z.string().optional().describe('Вебсайт'),

  telegram: z.preprocess(preprocessCB, TelegramZSchema.optional()),
  contact: z.preprocess(preprocessCB, ContactZSchema.optional()),
  socialLinks: z.preprocess(preprocessCB, SocialLinksZSchema.optional()),
});
