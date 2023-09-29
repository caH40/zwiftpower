import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

import { getRidersInEventsPrepared } from '../../redux/features/api/statistics/ridersInEventsSlice';
import { useChartRiders } from '../../hook/chart/riders/useChartRiders';
import useScreenOrientation from '../../hook/useScreenOrientation';
import NavBarRidersInEvent from '../UI/NavBarRidersInEvent/NavBarRidersInEvent';

import styles from './ChartRidersInEvents.module.css';

/**
 * На данной диаграмме количеств участвующих райдеров в Эвентах за определенный период
 * ось x: период (в зависимости от выбранного срока: месяц, неделя, день)
 * ось y: суммарное количество участников во всех заездах вне зависимости от организатора и типа заезда
 * фильтром выбирается общий период данных
 */
function ChartRidersInEvents({ ridersInEventsPrepared }) {
  const [form, setForm] = useState({ period: 'Год' });
  const { isPortrait } = useScreenOrientation();
  const { data, options } = useChartRiders({ ridersInEventsPrepared, isPortrait });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRidersInEventsPrepared(form.period));
  }, [form]);

  return (
    <>
      <h2>Количество участников в заездах</h2>
      <NavBarRidersInEvent form={form} setForm={setForm} />
      <div className={styles.block}>
        <Bar options={options} data={data} className={styles.chart} />
      </div>
    </>
  );
}

export default ChartRidersInEvents;
