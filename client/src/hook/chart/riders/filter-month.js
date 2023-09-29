import { months } from '../../../assets/dates';
/**
 * Группирование данных по месяцам, исключение месяцев в которых никто не участвовал
 */
export const filterForMonth = (data) => {
  // исключение результатов в которых никто не участвовал
  const dataFiltered = data.filter((elm) => elm.riders.male + elm.riders.female !== 0);

  const dataPrepared = months.map((month) => ({
    label: month,
    riders: { female: 0, male: 0 },
  }));

  // суммирование райдеров по месяцам в которых проводились Эвенты
  for (const elm of dataFiltered) {
    const monthNumber = new Date(elm.eventStart).getMonth();
    dataPrepared[monthNumber].riders.male += elm.riders.male;
    dataPrepared[monthNumber].riders.female += elm.riders.female;
  }

  // исключение результатов в месячном периоде в которых никто не участвовал
  const dataPreparedFiltered = [...dataPrepared].filter(
    (elm) => elm.riders.male + elm.riders.female !== 0
  );

  return dataPreparedFiltered;
};
