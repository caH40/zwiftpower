import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { useChartRidersTotalPie } from '../../../hook/chart/riders/useChartRidersTotalPie';

ChartJS.register(ArcElement, Tooltip, Legend);

import styles from './ChartRidersTotalFTPPie.module.css';

/**
 * Диаграмма суммарного количества райдеров по типам Эвентов
 */
function ChartRidersTotalFTPPie({ isMale }) {
  const { data, options } = useChartRidersTotalPie(isMale);
  return (
    <section>
      <h3 className={styles.title}>
        {isMale
          ? 'Суммарное количество мужчин по категориям'
          : 'Суммарное количество женщин по категориям'}
      </h3>
      <div className={styles.block}>
        <Pie data={data} options={options} />
      </div>
    </section>
  );
}

export default ChartRidersTotalFTPPie;
