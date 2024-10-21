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

function useChartRacingScore(metrics, isPortrait) {
  const chartValue = metrics.map((elm) => elm.racingScore);
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
        title: {
          display: !isPortrait, // в мобильной версии не показывать
          text: 'Racing Score',
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
    label: 'Гоночные рейтинговые очки',
    data: chartValue,
    pointBorderColor: 'red',
    borderColor: 'red',
    fill: false,
  };

  const data = {
    labels,
    datasets: [dataset],
  };

  return { data, options };
}

export default useChartRacingScore;
