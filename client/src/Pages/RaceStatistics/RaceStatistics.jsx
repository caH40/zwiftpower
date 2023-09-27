import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { fetchRidersInEvents } from '../../redux/features/api/statistics/fetchRidersInEvents';
import useTitle from '../../hook/useTitle';
import { useChartRiders } from '../../hook/useChartRiders';

import styles from './RaceStatistics.module.css';

function RaceStatistics() {
  useTitle('Статистика');
  const { ridersInEvents } = useSelector((state) => state.ridersInEventsFetch);
  const dispatch = useDispatch();
  console.log(ridersInEvents);
  useEffect(() => {
    dispatch(fetchRidersInEvents(36000000));
  }, []);

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
