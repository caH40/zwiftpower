/**
 * Получение уникальных и отсортированных категорий из массива результатов.
 * Специальная обработка для категорий с плюсом (плюс идет перед обычной буквой).
 *
 * @param {Object} param0 - Входные параметры.
 * @param {Array<any>} param0.results - Массив результатов.
 * @param {(r: any) => string | null | undefined} param0.getCategory - Функция для получения
 * категории из элемента массива.
 * @param {boolean} param0.needAbsolute - Флаг, указывающий, нужно ли добавить абсолютную категорию 'All'.
 * @returns {string[]} Отсортированный массив уникальных категорий.
 */
export const getCategoriesSortedDry = ({ results, getCategory, needAbsolute } = {}) => {
  const categoriesSet = new Set();

  for (const result of results) {
    const category = getCategory(result);
    if (category) {
      categoriesSet.add(category);
    }
  }

  // Функция для получения веса категории для сортировки
  const getSortWeight = (category) => {
    const lower = category.toLowerCase();

    // Категории с плюсом должны идти перед обычными
    if (lower.includes('+')) {
      // Заменяем "a+" на "a!" где "!" имеет меньший ASCII код чем буквы
      // Это обеспечит порядок: A+, затем A
      return lower.replace('+', '!');
    }

    // Для обычных категорий добавляем символ с бОльшим весом
    return lower + 'z';
  };

  const categoriesSorted = [...categoriesSet]
    .filter((category) => category)
    .sort((a, b) => {
      const weightA = getSortWeight(a);
      const weightB = getSortWeight(b);
      return weightA.localeCompare(weightB);
    });

  if (needAbsolute) {
    categoriesSorted.unshift('All');
  }

  return categoriesSorted;
};
