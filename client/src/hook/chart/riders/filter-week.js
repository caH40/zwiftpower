import { millisecondsIn28Days } from '../../../assets/dates';
import { getWeek } from '../../../utils/week';
/**
 * Группирование данных по неделям, за последние 3 месяца,
 * исключение недель в которых никто не участвовал
 */
export const filterForWeek = (data) => {
  const dataFiltered = data.filter((elm) => {
    const notNull = elm.riders.male + elm.riders.female !== 0;
    const isCurrentPeriod = elm.eventStart > Date.now() - millisecondsIn28Days;
    return notNull && isCurrentPeriod;
  });

  // номер текущей недели
  const weekCurrent = getWeek(Date.now());

  // инициализация результирующего массива
  const dataPrepared = Array(12)
    .fill('w')
    .map((_, index) => ({
      // есть вопросы как будет работать при первых неделях года с 1-12
      week: weekCurrent - index > 0 ? weekCurrent - index : weekCurrent - index + 52,
      label: '',
      riders: { female: 0, male: 0 },
    }))
    .reverse();

  // суммирование райдеров по неделям в которых проводились Эвенты
  for (const elm of dataFiltered) {
    const week = getWeek(elm.eventStart);
    const current = dataPrepared.find((elm) => elm.week === week);
    if (!current) {
      continue;
    }

    current.riders.male += elm.riders.male;
    current.riders.female += elm.riders.female;
    current.label = `неделя ${week}`;
  }

  // исключение результатов в месячном периоде в которых никто не участвовал
  const dataPreparedFiltered = [...dataPrepared].filter(
    (elm) => elm.riders.male + elm.riders.female !== 0
  );

  return dataPreparedFiltered;
};
