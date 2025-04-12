/**
 * Преобразует значение из байтов в килобайты (кБ) и возвращает результат с двумя знаками после запятой.
 * @param {*} bytes - Размер в Байтах
 * @returns {string} - Размер в КБайтах
 */
export function convertToKBytes(bytes) {
  return (bytes / 1024).toFixed(2);
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

/**
 * Определение размера в кБ объекта.
 * @param {object} obj - Любой объект (включая массивы, но не функции или цикличные ссылки).
 * @returns {string} Строка с информацией об размере объекта в Кб.
 */
export function getObjectSize(obj) {
  if (!obj) return '0 Кб';

  try {
    const jsonString = JSON.stringify(obj);
    if (!jsonString) return '0 Кб';
    const blob = new Blob([jsonString]);
    return `Размер объекта: ${convertToKBytes(blob.size)} Кб`;
  } catch (error) {
    console.error('Ошибка сериализации объекта:', error); // eslint-disable-line
    return 'Невозможно вычислить размер';
  }
}
