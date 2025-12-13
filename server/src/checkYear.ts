/**
 * Проверяем, что строка состоит ровно из 4 цифр/
 */
export function isValidYearString(str: string) {
  return /^\d{4}$/.test(str);
}
