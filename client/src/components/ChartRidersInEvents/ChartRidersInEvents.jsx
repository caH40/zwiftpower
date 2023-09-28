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

import { useChartRiders } from '../../hook/chart/useChartRiders';
import useScreenOrientation from '../../hook/useScreenOrientation';

import styles from './ChartRidersInEvents.module.css';
/**
 * График количества участвующих райдеров в Эвентах за определенный период
 */
function ChartRidersInEvents({ ridersInEvents }) {
  const { isPortrait } = useScreenOrientation();

  const { data, options } = useChartRiders({ ridersInEvents, isPortrait });

  return (
    <>
      <h2>Количество участников в заездах</h2>
      <div className={styles.block}>
        <Bar options={options} data={data} className={styles.chart} />
      </div>
    </>
  );
}

export default ChartRidersInEvents;
