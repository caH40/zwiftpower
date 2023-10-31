import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { useChartTypesRace } from '../../../hook/chart/riders/useChartTypesRace';

ChartJS.register(ArcElement, Tooltip, Legend);

import styles from './ChartTypesInsEvents.module.css';

/**
 * Диаграмма суммарного количества райдеров по типам Эвентов
 */
function ChartTypesInsEvents({ form }) {
  const { data, options } = useChartTypesRace({ period: form.period });
  return (
    <section>
      <h3 className={styles.title}>Типы заездов</h3>
      <div className={styles.block}>
        <Pie data={data} options={options} />
      </div>
    </section>
  );
}

export default ChartTypesInsEvents;
