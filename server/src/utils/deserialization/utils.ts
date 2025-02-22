/**
 * Функция для безопасного парсинга JSON с проверкой на undefined
 */
export const safeJsonParse = (val: string | undefined): unknown => {
  if (val === undefined) {
    return undefined;
  }
  try {
    return JSON.parse(val);
  } catch {
    return val; // Если ошибка, возвращаем как есть
  }
};
