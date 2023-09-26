import { Line } from 'react-chartjs-2';

import useTitle from '../../hook/useTitle';
import { useChartRiders } from '../../hook/useChartRiders';

import styles from './RaceStatistics.module.css';

function RaceStatistics() {
  useTitle('Статистика');

  const { data, options } = useChartRiders(false);

  return (
    <section>
      <h2>Количество участников, участвующих в заездах</h2>
      <div className={styles.block}>
        <Line options={options} data={data} className={styles.chart} />
      </div>
    </section>
  );
}

export default RaceStatistics;
