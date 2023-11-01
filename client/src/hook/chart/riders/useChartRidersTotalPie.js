import { useSelector } from 'react-redux';

import { getRidersInCategory } from '../../../utils/riders-category';
import { getColorCategory } from '../../../assets/rule-category';

/**
 * монтирование диаграммы распределения участников по ваттам
 */
export const useChartRidersTotalPie = (isMale = true) => {
  const { ridersTotal } = useSelector((state) => state.ridersTotalFTPFetch);

  const ridersInCategory = getRidersInCategory(ridersTotal, isMale);

  // названия названия по оси X
  const labels = ridersInCategory.map((elm) => elm.category);

  // отношение ширины к высоте холста в зависимости от позиции экрана устройства
  const aspectRatio = 2 / 1;

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
        label: 'количество в категории',
        data: ridersInCategory.map((elm) => elm.quantity),
        backgroundColor: getColorCategory(isMale, '0.8'),
      },
    ],
  };

  return { data, options };
};
