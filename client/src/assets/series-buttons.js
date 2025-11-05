export const seriesPublicButtons = [
  { id: 0, page: '/results', name: 'Результаты' },
  { id: 1, page: '/schedule', name: 'Расписание' },
  { id: 2, page: '/regulations', name: 'Регламент' },
];

/**
 * Кнопки для навигации между результатами Этапов серии и итоговыми таблицами.
 */
export const createSeriesResultsButtons = (stageOrders) => {
  // Убираем дубли.
  const filteredOrders = [...new Set(stageOrders)];

  const summaryButton = { id: 0, page: '', name: 'Главный зачёт' };

  // Генерация кнопок для всех Этапов.
  const stageButtons = filteredOrders.map((order, index) => ({
    id: index + 1,
    page: `/stage/${order}`,
    name: `${order}`,
  }));

  return [summaryButton, ...stageButtons];
};
