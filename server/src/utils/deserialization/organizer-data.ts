import { z } from 'zod';

// Функция для безопасного парсинга JSON с проверкой на undefined
const safeJsonParse = (val: string | undefined) => {
  if (val === undefined) return undefined;
  try {
    return JSON.parse(val);
  } catch {
    return val; // Если ошибка, возвращаем как есть
  }
};

// Основная схема для данных организатора.
export const OrganizerDataZSchema = z
  .object({
    isPublished: z
      .string()
      .refine((val) => val === 'true' || val === 'false', {
        message: 'isPublished должно быть строкой "true" или "false".',
      })
      .transform((val) => val === 'true') // Преобразуем строку в булево значение
      .describe('Опубликован ли организатор.'),

    name: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON
      .optional()
      .describe('Название организатора.'),

    organizerId: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON
      .describe('_id организатора.'),

    shortName: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON
      .optional()
      .describe('Краткое название организатора.'),

    description: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON
      .optional()
      .describe('Описание организатора.'),

    clubMain: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON
      .optional()
      .describe('Основной клуб организатора.'),

    telegram: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON
      .optional()
      .describe('Информация о Telegram-аккаунтах.'),

    website: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON
      .optional()
      .describe('Ссылка на веб-сайт организатора.'),

    country: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON
      .optional()
      .describe('Код страны организатора.'),

    socialLinks: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON
      .optional()
      .describe('Ссылки на социальные сети организатора.'),
  })
  .refine(
    (data) => {
      // Убираем поля с значением `undefined`
      const filteredData = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(data).filter(([_, v]) => v !== undefined)
      );
      return filteredData;
    },
    {
      message: 'Некоторые поля имеют значение undefined и не должны быть включены в объект.',
    }
  );
