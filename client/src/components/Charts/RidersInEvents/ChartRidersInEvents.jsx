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

import { useChartRiders } from '../../../hook/chart/riders/useChartRiders';

import styles from './ChartRidersInEvents.module.css';

/**
 * На данной диаграмме количеств участвующих райдеров в Эвентах за определенный период
 * ось x: период (в зависимости от выбранного срока: месяц, неделя, день)
 * ось y: суммарное количество участников во всех заездах вне зависимости от организатора и типа заезда
 * фильтром выбирается общий период данных
 */
function ChartRidersInEvents() {
  const { data, options } = useChartRiders();

  return (
    <section>
      <h3 className={styles.title}>В заездах</h3>
      <div className={styles.block}>
        <Bar options={options} data={data} className={styles.chart} />
      </div>
    </section>
  );
}

export default ChartRidersInEvents;
