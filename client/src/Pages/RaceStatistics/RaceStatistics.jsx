import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { fetchRidersInEvents } from '../../redux/features/api/statistics/fetchRidersInEvents';
import { resetRidersInEvents } from '../../redux/features/api/statistics/ridersInEventsSlice';
import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import { useChartRiders } from '../../hook/useChartRiders';
import useScreenOrientation from '../../hook/useScreenOrientation';

import styles from './RaceStatistics.module.css';

function RaceStatistics() {
  useTitle('Статистика');
  useBackground(false);
  const { ridersInEvents, status: fetchStatus } = useSelector(
    (state) => state.ridersInEventsFetch
  );
  const { isPortrait } = useScreenOrientation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRidersInEvents(36000000000));

    // обнуление стора при уходе со страницы
    return () => {
      dispatch(resetRidersInEvents());
    };
  }, []);

  const { data, options } = useChartRiders({ ridersInEvents, isPortrait });

  return (
    <section>
      <h2>Количество участников, участвующих в заездах</h2>
      {fetchStatus === 'resolved' && (
        <div className={styles.block}>
          <Line options={options} data={data} className={styles.chart} />
        </div>
      )}
    </section>
  );
}

export default RaceStatistics;
