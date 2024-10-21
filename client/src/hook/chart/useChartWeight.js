import {
  Chart as ChartJS,
  CategoryScale, // x scale
  LinearScale, // y scale
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler,
} from 'chart.js';

import { getTimerLocal } from '../../utils/date-local';

ChartJS.register(
  CategoryScale, // x scale
  LinearScale, // y scale
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler
);

function useChartWeight(metrics, isPortrait) {
  const chartValue = metrics.map((elm) => elm.weightInGrams / 1000);
  const labels = metrics.map((elm) => getTimerLocal(elm.date, 'DDMMYY'));

  // отношение ширины к высоте холста в зависимости от позиции экрана устройства
  const aspectRatio = isPortrait ? 1 / 1.45 : 2.5;

  const options = {
    aspectRatio,
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
        // Уменьшить минимальное значение для отступа.
        suggestedMin: Math.min(...chartValue) === 0 ? 0 : Math.min(...chartValue) - 1,
        // Увеличить максимальное значение для отступа.
        suggestedMax: Math.max(...chartValue) + 1,
        title: {
          display: !isPortrait, // в мобильной версии не показывать
          text: 'Вес, кг',
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

  const dataset = {
    filterWord: 'event',
    label: 'Вес, кг',
    data: chartValue,
    pointBorderColor: 'blue',
    borderColor: 'blue',
    fill: false,
  };

  const data = {
    labels,
    datasets: [dataset],
  };

  return { data, options };
}

export default useChartWeight;
