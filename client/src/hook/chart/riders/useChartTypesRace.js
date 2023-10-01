import { useSelector } from 'react-redux';

import { seriesType } from '../../../assets/series-type';

/**
 * Формирование данных для диаграммы суммарного количества райдеров по типам Эвентов
 */
export const useChartTypesRace = () => {
  const { ridersInEvents: dataForChart } = useSelector((state) => state.ridersInEventsFetch);

  // в каждый элемент добавляется количество райдеров ridersQuantity
  const typesRace = seriesType.map((type) => ({ ...type, ridersQuantity: 0 }));

  for (const event of dataForChart) {
    const currentType = typesRace.find((type) => type.name === event.typeRaceCustom);

    if (currentType) {
      currentType.ridersQuantity += event.riders.male + event.riders.female;
    }
  }

  // исключение типов Эвентов в которых не было райдеров
  const typesRaceFiltered = [...typesRace].filter((type) => type.ridersQuantity);

  // названия типов Эвентов
  const labels = typesRaceFiltered.map((type) => type.label);

  const data = {
    labels,
    datasets: [
      {
        label: 'суммарное количество участников',
        data: typesRaceFiltered.map((type) => type.ridersQuantity),
        backgroundColor: [
          '#ff4c73',
          '#b940ff',
          '#36a2eb',
          '#fcd269',
          '#22aaaa',
          '#3cff00',
          '#ff9f40',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return { data };
};
