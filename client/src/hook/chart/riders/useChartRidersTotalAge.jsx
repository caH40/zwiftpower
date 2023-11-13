import { useSelector } from 'react-redux';

import { getAgeCategoryLabels } from '../../../utils/age';

/**
 * Формирование данных для диаграммы распределения райдеров по возрастным категориям
 */
export const useChartRidersTotalAge = () => {
  const { ridersTotalAge: dataForChart } = useSelector((state) => state.ridersTotalAgeFetch);

  // исключение райдеров у которых не указан возраст
  const dataForChartFiltered = dataForChart.filter((data) => data.label !== '');

  const aspectRatio = 2 / 1;
  // названия возрастных категорий
  const labels = getAgeCategoryLabels(dataForChartFiltered);
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
        data: dataForChartFiltered.map((data) => data.value),
        backgroundColor: ['#FFE500', '#00B64F', '#4F10AD', '#FF3500', '#22aaaa', '#ea4cff'],
        hoverOffset: 4,
      },
    ],
  };

  return { data, options };
};
