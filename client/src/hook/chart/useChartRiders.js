import { getTimerLocal } from '../../utils/date-local';

export const useChartRiders = ({ ridersInEvents, isPortrait }) => {
  // исключение результатов в которых никто не участвовал
  const dataFiltered = [...ridersInEvents].filter(
    (elm) => elm.riders.male + elm.riders.female !== 0
  );

  const labels = dataFiltered.map((elm) => getTimerLocal(elm.eventStart, 'DDMMYY'));

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
        data: dataFiltered.map((elm) => elm.riders.male),
        backgroundColor: 'rgba(1, 107, 10, 0.5)',
      },
      {
        label: 'Женщины',
        data: dataFiltered.map((elm) => elm.riders.female),
        backgroundColor: 'rgba(121, 3, 255, 0.5)',
      },
    ],
  };

  return { data, options };
};
