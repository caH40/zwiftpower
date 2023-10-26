import { useSelector } from 'react-redux';

import useScreenOrientation from '../../useScreenOrientation';

/**
 * монтирование диаграммы распределения участников по ваттам
 */
export const useChartRidersTotal = (isMale = true) => {
  const { ridersTotal } = useSelector((state) => state.ridersTotalFTPFetch);

  const dataForChart = [...ridersTotal].filter((rider) =>
    isMale ? rider.quantityMale !== 0 : rider.quantityFemale !== 0
  );

  const { isPortrait } = useScreenOrientation();

  // названия названия по оси X
  const labels = dataForChart.map((elm) => elm.ftp);

  // отношение ширины к высоте холста в зависимости от позиции экрана устройства
  const aspectRatio = isPortrait ? 1 / 1.45 : 2.5;

  const options = {
    aspectRatio,
    pointRadius: 0,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'black',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
      },
    },
    scales: {
      x: {
        title: {
          display: !isPortrait, // в мобильной версии не показывать
          text: 'Удельная мощность, ватт/кг',
          font: { weight: 400, size: 14 },
        },
        ticks: {
          font: {
            size: isPortrait ? 11 : 14,
          },
        },
      },
      y: {
        title: {
          display: !isPortrait, // в мобильной версии не показывать
          text: 'Количество райдеров',
          font: { weight: 400, size: 14 },
        },
        ticks: {
          font: {
            size: isPortrait ? 11 : 14,
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: isMale ? 'Мужчины' : 'Женщины',
        data: dataForChart.map((elm) => (isMale ? elm.quantityMale : elm.quantityFemale)),
        backgroundColor: isMale ? 'rgba(1, 107, 10, 0.5)' : 'rgba(121, 3, 255, 0.5)',
      },
    ],
  };

  return { data, options };
};
