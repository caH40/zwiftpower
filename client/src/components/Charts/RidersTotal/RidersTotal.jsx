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

import { useChartRidersTotal } from '../../../hook/chart/riders/useChartRidersTotal';

import styles from './RidersTotal.module.css';

/**
 * Распределение всех райдеров по удельной мощности
 * ось x: 0.1 ватт
 * ось y: суммарное количество участников
 */
function ChartRidersTotal() {
  const { data, options } = useChartRidersTotal();

  return (
    <section>
      <h3 className={styles.title}>По удельной мощности</h3>
      <div className={styles.block}>
        <Bar options={options} data={data} className={styles.chart} />
      </div>
    </section>
  );
}

export default ChartRidersTotal;
