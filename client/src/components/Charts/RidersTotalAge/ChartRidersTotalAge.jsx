import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { useChartRidersTotalAge } from '../../../hook/chart/riders/useChartRidersTotalAge';

ChartJS.register(ArcElement, Tooltip, Legend);

import styles from './ChartRidersTotalAge.module.css';

/**
 * Диаграмма суммарного количества райдеров по типам Эвентов
 */
function ChartRidersTotalAge() {
  const { data, options } = useChartRidersTotalAge();
  return (
    <section>
      <h3 className={styles.title}>Возрастные категории</h3>
      <div className={styles.block}>
        <Pie data={data} options={options} />
      </div>
    </section>
  );
}

export default ChartRidersTotalAge;
