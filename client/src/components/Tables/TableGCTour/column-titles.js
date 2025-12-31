export const TableGCTourColumnsStart = [
  { name: 'Место', id: 0 },
  { name: 'Категория', id: 1 },
  { name: 'Райдер', id: 2 },
  { name: 'Команда', id: 3 },
  { name: 'Время', id: 4 },
  { name: 'Отставание от лидера', id: 5 },
  { name: 'Отставание от райдера впереди', id: 6 },
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
