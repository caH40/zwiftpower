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
  const { pointsWatts, pointsWattsPerKg } = useSelector(
    (state) => state.fetchUserPowerCurve.powerCurve
  );

  const { value: chartValue } = useSelector((state) => state.filterWatts);

  const durationLabelsCurrent = pointsWatts?.map((watt) => {
    if (watt.duration < 59) return watt.duration + ' сек';
    else {
      return watt.duration / 60 + ' мин';
    }
  });
  const labels = pointsWatts ? durationLabelsCurrent : durationLabelsNull;

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
        title: {
          display: !isPortrait, // в мобильной версии не показывать
          text: chartValue.column === 'watts' ? 'Мощность, ватты' : 'Удельная мощность, вт/кг ',
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
    data:
      chartValue.column === 'watts'
        ? pointsWatts?.map((watt) => watt.value)
        : pointsWattsPerKg?.map((watt) => watt.value),
    backgroundColor:
      chartValue.column === 'watts' ? 'rgba(249, 220, 22, 0.8)' : 'rgba(255, 136, 0, 0.8)',
    pointBorderColor: '#a65100',
    fill: true,
  };

  const powerCurveDatasetsLastRide = {
    filterWord: 'event',
    label: `${getTimerLocal(powerFromEvent?.eventStart, 'DDMMYY')}, ${
      powerFromEvent?.eventName
    }`,
    data:
      chartValue.column === 'watts'
        ? powerFromEvent.cpBestEfforts?.map((value) => value.watts)
        : powerFromEvent.cpBestEfforts?.map((value) => value.wattsKg),
    backgroundColor:
      chartValue.column === 'watts' ? 'rgba(66, 10, 170, 0.8)' : 'rgba(15, 79, 168, 0.8)',
    pointBorderColor: '#ffda73',
    fill: true,
  };

  const data = {
    labels,
    datasets: [powerCurveDatasetsLastRide, powerCurveDatasets90days].filter(
      (element) =>
        (element.filterWord === '90days' && formShowCharts.showChart90Days) ||
        (element.filterWord === 'event' && powerFromEvent?._id)
    ),
  };

  return { data, options };
}

export default useChartPower;
