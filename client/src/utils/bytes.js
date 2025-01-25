/**
 * Преобразует значение из байтов в килобайты (кБ) и возвращает результат с двумя знаками после запятой.
 * @param {*} number - Размер в Байтах
 * @returns {string} - Размер в КБайтах
 */
export function convertToKBytes(number) {
  return (number * 0.000977).toFixed(2);
}

/**
 * Преобразует размер из байтов в мегабайты (MB).
 *
 * @param {number} bytes - Размер в байтах.
 * @returns {string} Размер в мегабайтах с двумя знаками после запятой.
 */
export function convertToMBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
}
