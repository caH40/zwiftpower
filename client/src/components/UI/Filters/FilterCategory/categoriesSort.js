/**
 * Получение уникальных и отсортированных категорий из массива результатов.
 *
 * @param {Object} param0 - Входные параметры.
 * @param {Array<any>} param0.results - Массив результатов.
 * @param {(r: any) => string | null | undefined} param0.getCategory - Ф для получения категории из элемента массива.
 * @param {boolean} param0.needAbsolute - Флаг, указывающий, нужно ли добавить абсолютную категорию 'All'.
 * @returns {string[]} Отсортированный массив уникальных категорий.
 */
export const getCategoriesSortedDry = ({ results, getCategory, needAbsolute } = {}) => {
  // Создаем множество для хранения уникальных категорий
  const categoriesSet = new Set();

  for (const result of results) {
    // Добавляем категорию, полученную с помощью геттера
    categoriesSet.add(getCategory(result));
  }

  // Преобразуем Set в массив, фильтруем пустые значения и сортируем по алфавиту
  const categoriesSorted = [...categoriesSet]
    .filter((category) => category) // Убираем null/undefined/пустые строки
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())); // Алфавитная сортировка

  // При необходимости добавляем 'All' (абсолютный протокол) в начало
  if (needAbsolute) {
    categoriesSorted.unshift('All');
  }

  return categoriesSorted;
};
