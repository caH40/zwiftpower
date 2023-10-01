import { useSelector } from 'react-redux';

import { seriesType } from '../../../assets/series-type';
import { convertPeriodToMilliseconds } from '../../../utils/filter-charts';

/**
 * Формирование данных для диаграммы суммарного количества райдеров по типам Эвентов
 */
export const useChartTypesRace = ({ period }) => {
  const { ridersInEvents: dataForChart } = useSelector((state) => state.ridersInEventsFetch);

  // перевод строки в миллисекунды
  const periodMilliseconds = convertPeriodToMilliseconds(period);

  // фильтрация результатов согласно выбранного периода
  const filteredDataForChart = [...dataForChart].filter(
    (elm) => elm.eventStart > Date.now() - periodMilliseconds
  );

  // в каждый элемент добавляется количество райдеров ridersQuantity
  const typesRace = seriesType.map((type) => ({ ...type, ridersQuantity: 0 }));

  for (const event of filteredDataForChart) {
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
          '#ff19e0',
          '#0079ca',
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
