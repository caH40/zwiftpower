/**
 * Расчет нормализованной мощности
 * @param {} powerInWatts массив посекундной мощности за весь маршрут гонки
 * @return {} нормализованная мощность с точностью до сотых
 */
export const getNormalizedPower = (powerInWatts: number[]): number => {
  // количество секунд за который рассчитывается средняя мощность одной итерации
  const quantitySeconds = 30;

  // происходит смещение записи в firFile около 20 секунд,
  // поэтому последние 20 секунд записи приходятся после пересечения финишной линии,
  // что может существенно влиять на рассчитываемую среднюю и нормализованную мощность
  const gap = 20;
  const length = powerInWatts.length - gap;

  let powerSum = 0;
  // количество итераций, количество частей по 30 секунд в
  const iterations = Math.ceil(length / quantitySeconds);

  for (let i = 0; i < powerInWatts.length; i = i + quantitySeconds) {
    // количество секунд в последней итерации
    const iterationLast = length - (iterations - 1) * quantitySeconds;

    // количество секунд в текущей итерации
    const iterationCurrent =
      iterations === i / quantitySeconds ? iterationLast : quantitySeconds;

    const powerSumBy30Seconds = powerInWatts.slice(i, i + 30).reduce((acc, cur) => acc + cur);
    powerSum = powerSum + Math.pow(powerSumBy30Seconds / iterationCurrent, 4);
  }

  return Math.round(Math.pow(powerSum / iterations, 0.25) * 100) / 100;
};
