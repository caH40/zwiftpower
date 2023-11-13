import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { fetchRidersInEvents } from '../../redux/features/api/statistics/fetchRidersInEvents';
import {
  getRidersInEventsPrepared,
  resetRidersInEvents,
} from '../../redux/features/api/statistics/ridersInEventsSlice';
import useTitle from '../../hook/useTitle';
import ChartRidersInEvents from '../../components/Charts/RidersInEvents/ChartRidersInEvents';
import ChartTypesInsEvents from '../../components/Charts/TypesInsEvents/ChartTypesInsEvents';
import { millisecondsYear } from '../../assets/dates';

import NavBarRidersInEvent from '../../components/UI/NavBarRidersInEvent/NavBarRidersInEvent';

import styles from './Statistics.module.css';
const cx = classNames.bind(styles);

function RidersInEvents() {
  useTitle('Статистика');
  const [form, setForm] = useState({ period: 'Год' });
  const { status: fetchStatus } = useSelector((state) => state.ridersInEventsFetch);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRidersInEvents(millisecondsYear));

    // обнуление стора при уходе со страницы
    return () => {
      dispatch(resetRidersInEvents());
    };
  }, []);

  useEffect(() => {
    dispatch(getRidersInEventsPrepared(form.period));
  }, [form]);

  return (
    <section>
      {fetchStatus === 'resolved' && (
        <>
          <h2 className={cx('title')}>Количество участников</h2>
          <NavBarRidersInEvent form={form} setForm={setForm} />
          <div className={cx('wrapper__charts')}>
            <div className={cx('wrapper__chart')}>
              <ChartRidersInEvents />
            </div>
            <div className={cx('wrapper__chart')}>
              <ChartTypesInsEvents form={form} />
            </div>
            <div className={cx('wrapper__chart')}>
              <ChartTypesInsEvents form={form} />
            </div>
            <div className={cx('wrapper__chart', 'invisible')}></div>
          </div>
          <p className={cx('annotation')}>
            * при клике на параметре исключается данный параметр из диаграммы
          </p>
        </>
      )}
    </section>
  );
}
export default RidersInEvents;
