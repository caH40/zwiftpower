/**
 * Поиск дубликатов в массиве.
 * @param {Object} params - Входные параметры.
 * @param {number[]} params.elements - Массив элементов для поиска дубликатов.
 * @param {number} params.exception - Число, которое не учитывается как дубликат.
 * @returns {number[]} - Массив дубликатов.
 */
export function getDuplicates({ elements, exception }) {
  if (!Array.isArray(elements)) return [];

  const seen = new Set();
  const duplicates = new Set();

  for (const num of elements) {
    if (seen.has(num) && num !== exception) {
      duplicates.add(num);
    }
    seen.add(num);
  }

  return [...duplicates];
}
