import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import { useChartRidersTotalRacingScore } from '../../../hook/chart/riders/useChartRidersTotalRacingScore';

import styles from './RidersTotalRacingScore.module.css';

/**
 * Распределение всех райдеров по рейтинговым очкам.
 */
function ChartRidersTotalRacingScore({ isMale }) {
  const { data, options } = useChartRidersTotalRacingScore(isMale);

  return (
    <section>
      <h3 className={styles.title}>{isMale ? 'Мужчины' : 'Женщины'}</h3>
      <div className={styles.block}>
        <Bar options={options} data={data} className={styles.chart} />
      </div>
    </section>
  );
}

export default ChartRidersTotalRacingScore;
