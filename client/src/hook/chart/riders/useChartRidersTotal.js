import { useSelector } from 'react-redux';

import useScreenOrientation from '../../useScreenOrientation';

/**
 * монтирование диаграммы распределения участников по ваттам
 */
export const useChartRidersTotal = () => {
  const { ridersInEventsPrepared: dataForChart } = useSelector(
    (state) => state.ridersInEventsFetch
  );
  const { isPortrait } = useScreenOrientation();
  const d = [
    { ftp: 0.9, quantity: 1 },
    { ftp: 1.2, quantity: 1 },
    { ftp: 1.6, quantity: 1 },
    { ftp: 1.7, quantity: 4 },
    { ftp: 1.8, quantity: 7 },
    { ftp: 1.9, quantity: 8 },
    { ftp: 2, quantity: 11 },
    { ftp: 2.1, quantity: 7 },
    { ftp: 2.2, quantity: 13 },
    { ftp: 2.3, quantity: 8 },
    { ftp: 2.4, quantity: 12 },
    { ftp: 2.5, quantity: 26 },
    { ftp: 2.6, quantity: 20 },
    { ftp: 2.7, quantity: 23 },
    { ftp: 2.8, quantity: 26 },
    { ftp: 2.9, quantity: 27 },
    { ftp: 3, quantity: 23 },
    { ftp: 3.1, quantity: 25 },
    { ftp: 3.2, quantity: 29 },
    { ftp: 3.3, quantity: 36 },
    { ftp: 3.4, quantity: 22 },
    { ftp: 3.5, quantity: 18 },
    { ftp: 3.6, quantity: 19 },
    { ftp: 3.7, quantity: 16 },
    { ftp: 3.8, quantity: 31 },
    { ftp: 3.9, quantity: 18 },
    { ftp: 4, quantity: 18 },
    { ftp: 4.1, quantity: 11 },
    { ftp: 4.2, quantity: 4 },
    { ftp: 4.3, quantity: 4 },
    { ftp: 4.4, quantity: 5 },
    { ftp: 4.5, quantity: 1 },
    { ftp: 4.6, quantity: 4 },
    { ftp: 4.7, quantity: 5 },
    { ftp: 4.8, quantity: 3 },
    { ftp: 4.9, quantity: 1 },
    { ftp: 5.2, quantity: 1 },
  ];
  // названия названия по оси X
  const labels = d.map((elm) => elm.ftp);

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
        stacked: true,
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
          text: 'Количество участников',
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
        label: 'Мужчины',
        data: d.map((elm) => elm.quantity),
        backgroundColor: 'rgba(100, 0, 10, 0.5)',
      },
    ],
  };

  return { data, options };
};
