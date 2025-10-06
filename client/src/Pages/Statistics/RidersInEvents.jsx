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
import ChartRidersTotalAge from '../../components/Charts/RidersTotalAge/ChartRidersTotalAge';
import NavBarRidersInEvent from '../../components/UI/NavBarRidersInEvent/NavBarRidersInEvent';
import { fetchRidersTotalAge } from '../../redux/features/api/statistics_age/fetchRidersTotalAge';
import { resetRidersTotalAge } from '../../redux/features/api/statistics_age/ridersTotalAgeSlice';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { STATISTICS_HELMET_PROPS } from '../../assets/helmet-props';
import SkeletonRidersDiagrams from '../../components/SkeletonLoading/SkeletonRidersDiagrams/SkeletonRidersDiagrams';

import styles from './Statistics.module.css';

const cx = classNames.bind(styles);

function RidersInEvents() {
  useTitle('Статистика');
  const [form, setForm] = useState({ period: 'Год' });
  const { status: statusRidersInEventsFetch } = useSelector(
    (state) => state.ridersInEventsFetch
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRidersInEvents(millisecondsYear));
    dispatch(fetchRidersTotalAge());

    // обнуление стора при уходе со страницы
    return () => {
      dispatch(resetRidersInEvents());
      dispatch(resetRidersTotalAge());
    };
  }, []);

  useEffect(() => {
    dispatch(getRidersInEventsPrepared(form.period));
  }, [form]);

  return (
    <section>
      <HelmetComponent {...STATISTICS_HELMET_PROPS.MAIN} />

      <h2 className={cx('title')}>Количество участников</h2>

      {/* Выбор сезона */}
      <div className={styles.box__filter}>
        <NavBarRidersInEvent form={form} setForm={setForm} />
      </div>

      {/* скелетон для загрузки */}
      <SkeletonRidersDiagrams status={statusRidersInEventsFetch} quantityCharts={4} />

      {statusRidersInEventsFetch === 'resolved' && (
        <>
          <div className={cx('wrapper__charts')}>
            <div className={cx('wrapper__chart')}>
              <ChartRidersInEvents />
            </div>
            <div className={cx('wrapper__chart')}>
              <ChartTypesInsEvents form={form} />
            </div>
            <div className={cx('wrapper__chart')}>
              <ChartRidersTotalAge />
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
