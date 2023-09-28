import { getTimerLocal } from '../../../utils/date-local';

/**
 * монтирование диаграммы происходит с периодом за год, с lables по месяцам
 */
export const useChartRiders = ({ ridersInEventsPrepared: dataForChart, isPortrait }) => {
  const labels = dataForChart.map((elm) => elm.label);

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
          text: 'Дата',
          font: { weight: 400, size: 14 },
        },
        ticks: {
          font: {
            size: isPortrait ? 11 : 14,
          },
        },
      },
      y: {
        stacked: true,
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
        data: dataForChart.map((elm) => elm.riders.male),
        backgroundColor: 'rgba(1, 107, 10, 0.5)',
      },
      {
        label: 'Женщины',
        data: dataForChart.map((elm) => elm.riders.female),
        backgroundColor: 'rgba(121, 3, 255, 0.5)',
      },
    ],
  };

  return { data, options };
};
