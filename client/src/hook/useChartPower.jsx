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

ChartJS.register(
  CategoryScale, // x scale
  LinearScale, // y scale
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler
);

const durationLabelsNull = [
  5,
  15,
  30,
  '1 мин',
  '3 мин',
  '5 мин',
  '12 мин',
  '20 мин',
  '30 мин',
  '10 мин',
  '60 мин',
];

function useChartPower(isPortrait, formShowCharts) {
  const { results, powerCurve } = useSelector((state) => state.fetchUserResults);
  const powerNull = Array(11).fill(0);

  const durationLabelsCurrent = powerCurve.pointsWatts?.map((watt) => {
    if (watt.duration < 59) return watt.duration + ' сек';
    else {
      return watt.duration / 60 + ' мин';
    }
  });
  const labels = powerCurve.pointsWatts ? durationLabelsCurrent : durationLabelsNull;

  const options = {
    aspectRatio: isPortrait ? 1 / 1.5 : null,
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
    label: '90 дней',
    data: powerCurve.pointsWatts ? powerCurve.pointsWatts.map((watt) => watt.value) : powerNull,
    backgroundColor: 'rgba(255, 145, 0, 0.9)',
    // borderColor: 'rgba(255, 145, 0, 1)',
    pointBorderColor: '#a65100',
    fill: true,
    tension: 0.3,
  };
  const powerCurveDatasetsLastRide = {
    label: 'Последний заезд',
    data: results[0] ? results[0].cpBestEfforts.map((watt) => watt.watts.value) : powerNull,
    backgroundColor: 'rgba(15, 79, 168, 0.8)',
    // borderColor: 'rgba(15, 79, 168, 0.9)',
    pointBorderColor: '#ffda73',
    fill: true,
    tension: 0.3,
  };

  const data = {
    labels,
    datasets: [powerCurveDatasetsLastRide, powerCurveDatasets90days].filter(
      (element) =>
        (element.label === '90 дней' && formShowCharts.showChart90Days) ||
        (element.label === 'Последний заезд' && formShowCharts.showChartLastRide)
    ),
  };

  return { data, options };
}

export default useChartPower;
