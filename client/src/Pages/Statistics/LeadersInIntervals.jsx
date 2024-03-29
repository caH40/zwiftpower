import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import { fetchLeadersInIntervals } from '../../redux/features/api/leadersInIntervals/fetchLeadersInIntervals';
import { resetLeadersInIntervals } from '../../redux/features/api/leadersInIntervals/leadersInIntervalsSlice';
import TableLeadersInIntervals from '../../components/Tables/TableLeadersInIntervals/TableLeadersInIntervals';
import NavBarLeadersGender from '../../components/UI/NavBarLeadersGender/NavBarLeadersGender';
import FilterIntervalsForLeader from '../../components/UI/Filters/FilterInterval/FilterIntervalsForLeader';
import { HelmetLeaders } from '../../components/Helmets/HelmetLeaders';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';

import styles from './Statistics.module.css';

function LeadersInIntervals() {
  useTitle('Рейтинг райдеров по мощности');

  // определение страницы для мужчин или женщин
  const { pathname } = useLocation();
  const gender = pathname.includes('/female') ? 'female' : 'male';

  const {
    maxWatts,
    maxWattsPerKg,
    status: statusLeadersInIntervalsFetch,
  } = useSelector((state) => state.leadersInIntervalsFetch);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeadersInIntervals(gender));
    return () => dispatch(resetLeadersInIntervals());
  }, [gender]);

  return (
    <div>
      <HelmetLeaders gender={gender} />
      <div className={styles.navigation}>
        <NavBarLeadersGender addCls={'mb15'} />
        <FilterIntervalsForLeader />
      </div>

      {/* скелетон загрузки */}
      <SkeletonTable status={statusLeadersInIntervalsFetch} rows={11} needCaption={true} />
      <br />
      <SkeletonTable status={statusLeadersInIntervalsFetch} rows={11} needCaption={true} />

      {!!maxWatts.length && statusLeadersInIntervalsFetch === 'resolved' && (
        <>
          <section>
            <h2>Лидеры по абсолютным ваттам за 90 дней </h2>
            <article className={styles.block__table}>
              <TableLeadersInIntervals leadersInIntervals={maxWatts} type={'watts'} />
            </article>
          </section>

          <section>
            <h2>Лидеры по удельной мощности за 90 дней</h2>
            <article className={styles.block__table}>
              <TableLeadersInIntervals leadersInIntervals={maxWattsPerKg} type={'wattsPerKg'} />
            </article>
          </section>
        </>
      )}
    </div>
  );
}

export default LeadersInIntervals;
