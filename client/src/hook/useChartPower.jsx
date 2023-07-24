import { useSelector } from 'react-redux';
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

import { durationLabelsNull } from '../asset/power-interval';
import { getTimerLocal } from '../utils/date-local';

ChartJS.register(
  CategoryScale, // x scale
  LinearScale, // y scale
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler
);

function useChartPower(powerFromEvent, isPortrait, formShowCharts) {
  const { powerCurve } = useSelector((state) => state.fetchUserPowerCurve);
  const powerNull = Array(11).fill(0);

  const durationLabelsCurrent = powerCurve.pointsWatts?.map((watt) => {
    if (watt.duration < 59) return watt.duration + ' сек';
    else {
      return watt.duration / 60 + ' мин';
    }
  });
  const labels = powerCurve.pointsWatts ? durationLabelsCurrent : durationLabelsNull;

  // отношение ширины к высоте холста в зависимости от позиции экрана устройства
  const aspectRatio = isPortrait ? 1 / 1.5 : 2.3;

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
          text: 'Длительность',
          font: { weight: 400, size: 14 },
        },
        ticks: {
          font: {
            size: isPortrait ? 11 : 14,
          },
        },
      },
      y: {
        // min: 0,
        max: powerCurve.pointsWatts ? null : 1000,
        title: {
          display: !isPortrait, // в мобильной версии не показывать
          text: 'Мощность, ватты',
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

  const powerCurveDatasets90days = {
    filterWord: '90days',
    label: '90 дней',
    data: powerCurve.pointsWatts ? powerCurve.pointsWatts.map((watt) => watt.value) : powerNull,
    backgroundColor: 'rgba(255, 145, 0, 0.9)',
    pointBorderColor: '#a65100',
    fill: true,
  };
  const powerCurveDatasetsLastRide = {
    filterWord: 'event',
    label: `${getTimerLocal(powerFromEvent?.eventStart, 'YMD')}, ${powerFromEvent?.eventName}`,
    data: powerFromEvent ? powerFromEvent.cpBestEfforts?.map((watt) => watt.watts) : powerNull,
    backgroundColor: 'rgba(15, 79, 168, 0.8)',
    pointBorderColor: '#ffda73',
    fill: true,
  };

  const data = {
    labels,
    datasets: [powerCurveDatasetsLastRide, powerCurveDatasets90days].filter(
      (element) =>
        (element.filterWord === '90days' && formShowCharts.showChart90Days) ||
        (element.filterWord === 'event' && powerFromEvent?.id)
    ),
  };

  return { data, options };
}

export default useChartPower;
