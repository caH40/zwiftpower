import { useSelector } from 'react-redux';

import useScreenOrientation from '../../useScreenOrientation';
import { getCategoryColors } from '../../../utils/category-colors';
import { getCategoryColorsRS } from '../../../utils/category-colors-rs';

/**
 * Монтирование диаграммы распределения участников по рейтинговым очкам.
 */
export const useChartRidersTotalRacingScore = (isMale = true) => {
  const { maleRacingScore, femaleRacingScore } = useSelector(
    (state) => state.ridersTotalRacingScoreFetch
  );

  const { isPortrait } = useScreenOrientation();

  const dataForChart = isMale ? maleRacingScore : femaleRacingScore;

  // названия названия по оси X
  const labels = dataForChart.map((elm) => elm.scoreRange);
  const axisMin = dataForChart.find((elm) => elm.value !== 0)?.scoreRange || 10;
  const axisMax = dataForChart.findLast((elm) => elm.value !== 0)?.scoreRange || 1000;

  // отношение ширины к высоте холста в зависимости от позиции экрана устройства
  const aspectRatio = isPortrait ? 1 / 1.45 : 2.5;

  const options = {
    aspectRatio,
    pointRadius: 0,
    plugins: {
      data: {
        labels: {
          color: 'black',
        },
      },
      legend: {
        display: false,
        labels: {
          color: 'black',
          boxHeight: 0, // скрыть бокс Легенды, так как окрашивается в первый цвет Бара
          boxWidth: 0,
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
          text: 'Рейтинговые очки (Racing Score)',
          font: { weight: 400, size: 14 },
        },
        ticks: {
          font: {
            size: isPortrait ? 11 : 14,
          },
        },
        min: axisMin,
        max: axisMax,
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
        data: dataForChart.map((elm) => elm.value),
        backgroundColor: getCategoryColorsRS(dataForChart, isMale),
      },
    ],
  };

  return { data, options };
};
