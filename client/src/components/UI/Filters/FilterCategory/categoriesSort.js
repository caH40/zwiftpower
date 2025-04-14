//
export const getCategoriesSorted = (results) => {
  const categoriesSet = new Set();
  for (const result of results) {
    categoriesSet.add(result.subgroupLabel);
  }

  const categoriesSorted = [...categoriesSet]
    .filter((category) => category)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  return ['All', ...categoriesSorted];
};

/**
 * Создание навигационных кнопок с категориями для структуры результатов stageResult.
 */
export const getCategoriesSortedNew = (results) => {
  const categoriesSet = new Set();
  for (const result of results) {
    categoriesSet.add(result.category);
  }

  const categoriesSorted = [...categoriesSet]
    .filter((category) => category)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  return ['All', ...categoriesSorted];
};
