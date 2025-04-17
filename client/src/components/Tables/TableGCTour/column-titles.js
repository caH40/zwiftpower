export const TableGCTourColumnsStart = [
  { name: 'Место', id: 1 },
  { name: 'Категория', id: 2 },
  { name: 'Райдер', id: 3 },
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
export const gCTourColumnsStages = (stages = []) =>
  stages.map(({ stageOrder, name }) => {
    if (stageOrder === 0 && name) {
      return { name, id: 100 };
    }
    return { name: `Этап №${stageOrder}${name ? ', name' : ''}`, id: 100 + stageOrder };
  });
