import { useSelector } from 'react-redux';

import { convertPeriodToMilliseconds } from '../../../utils/filter-charts';

export const raceTypes = [
  { id: 0, value: 'TT', name: 'TT', label: 'TT' },
  { id: 1, value: 'catchUp', name: 'Догонялки', label: 'CU' },
  { id: 2, value: 'newbies', name: 'Для новичков', label: 'NE' },
  { id: 3, value: 'classicGroup', name: 'Классическая с делением на группы', label: 'CG' },
  { id: 4, value: 'classicCommon', name: 'Классическая без групп', label: 'CT' },
  { id: 6, value: 'longRide', name: 'Объем', label: 'LR' },
];

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
  const typesRace = raceTypes.map((type) => ({ ...type, ridersQuantity: 0 }));

  for (const event of filteredDataForChart) {
    const currentType = typesRace.find((type) => type.value === event.typeRaceCustom);

    if (currentType) {
      currentType.ridersQuantity += event.riders.male + event.riders.female;
    }
  }

  // исключение типов Эвентов в которых не было райдеров
  const typesRaceFiltered = [...typesRace].filter((type) => type.ridersQuantity);

  const aspectRatio = 2 / 1;
  // названия типов Эвентов
  const labels = typesRaceFiltered.map((type) => type.name);
  const options = {
    aspectRatio,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  };

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

  return { data, options };
};
