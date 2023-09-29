import { millisecondsIn30Days, millisecondsInDays } from '../../../assets/dates';
import { getWeek } from '../../../utils/week';
/**
 * Группирование данных по дням, за последние 30 дней,
 * исключение дней в которых никто не участвовал
 */
export const filterForDay = (data) => {
  const dataFiltered = data.filter((elm) => {
    const notNull = elm.riders.male + elm.riders.female !== 0;
    const isCurrentPeriod = elm.eventStart > Date.now() - millisecondsIn30Days;
    return notNull && isCurrentPeriod;
  });

  // дата текущего дня
  const dayLocale = (time) => new Date(time).toLocaleDateString();

  // инициализация результирующего массива
  const dataPrepared = Array(30)
    .fill('d')
    .map((_, index) => ({
      day: dayLocale(Date.now() - index * millisecondsInDays),
      label: '',
      riders: { female: 0, male: 0 },
    }))
    .reverse();

  // суммирование райдеров по дням в которых проводились Эвенты
  for (const elm of dataFiltered) {
    const day = dayLocale(elm.eventStart);
    const current = dataPrepared.find((elm) => elm.day === day);
    if (!current) {
      continue;
    }

    current.riders.male += elm.riders.male;
    current.riders.female += elm.riders.female;
    current.label = `${day}`;
  }

  // исключение результатов в месячном периоде в которых никто не участвовал
  const dataPreparedFiltered = [...dataPrepared].filter(
    (elm) => elm.riders.male + elm.riders.female !== 0
  );

  return dataPreparedFiltered;
};
