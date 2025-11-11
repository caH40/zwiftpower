export const TableGCTourColumnsStart = [
  { name: 'Место', id: 1 },
  { name: 'Категория', id: 2 },
  { name: 'Райдер', id: 3 },
  { name: 'Расстояние', id: 4, tooltip: 'Общее расстояние' },
  { name: 'Подъем', id: 5, tooltip: 'Общий набор высоты' },
  { name: 'Огонь', id: 6, tooltip: 'Потраченные калории' },
  { name: 'Время', id: 7, tooltip: 'Общее время' },
];

/**
 * @param {Array<{stageOrder: number, name?: string}>} stages - Массив объектов этапов.
 * @param {number} stages[].stageOrder - Порядковый номер этапа (начиная с 0).
 * @param {string} [stages[].name] - Необязательное название этапа.
 * @returns {Array<{name: string, id: number}>} Массив объектов колонок.
 */
export const gCTourStageColumns = (stages = []) =>
  stages.map(({ stageOrder, name }, index) => {
    if (stageOrder === 0 && name) {
      return { name, id: 1000 + index };
    }
    return {
      name: `Этап №${stageOrder}${name ? ', name' : ''}`,
      id: '100' + stageOrder + index,
    };
  });
