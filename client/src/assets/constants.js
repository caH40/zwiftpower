/**
 * Текущий сезон, указывается при первоначальном запросе для некоторых страниц: catchup
 */
export const seasonCurrent = '2023';
/**
 * Параметры для Variability Index
 * color - цвет отображения зоны
 * value - верхняя граница зоны (включая данное значение)
 */
export const viParams = {
  z1: { color: 'green', value: 1.05 },
  z2: { color: '#f3f300', value: 1.1 },
  z3: { color: 'orange', value: 1.2 },
  z4: { color: 'red', value: 1.99 },
};

/**
 * Количество записей при пагинации
 */
export const records = [
  { id: 0, value: 5 },
  { id: 1, value: 10 },
  { id: 2, value: 15 },
  { id: 3, value: 20 },
  { id: 4, value: 25 },
  { id: 5, value: 50 },
];
