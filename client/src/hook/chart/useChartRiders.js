import { getTimerLocal } from '../../utils/date-local';

export const useChartRiders = ({ ridersInEvents, isPortrait }) => {
  const labels = ridersInEvents.map((elm) => getTimerLocal(elm.eventStart, 'DDMMYY'));

  // отношение ширины к высоте холста в зависимости от позиции экрана устройства
  const aspectRatio = isPortrait ? 1 / 1.45 : 2.5;

  const options = {
    aspectRatio,
    // cubicInterpolationMode: 'monotone',
    pointRadius: 0,
    tension: 0.4,
    // borderColor: 'orange',
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

  const riders = {
    // filterWord: '90days',
    label: 'за всё время',
    data: ridersInEvents.map((elm) => elm.riders.male + elm.riders.female),
    backgroundColor: '#1a9c00',
    fill: true,
  };

  const data = {
    datasets: [riders],
    labels,
  };

  return { data, options };
};
