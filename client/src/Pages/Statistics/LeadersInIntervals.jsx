import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import { fetchLeadersInIntervals } from '../../redux/features/api/leadersInIntervals/fetchLeadersInIntervals';
import { resetLeadersInIntervals } from '../../redux/features/api/leadersInIntervals/leadersInIntervalsSlice';
import TableLeadersInIntervals from '../../components/Tables/TableLeadersInIntervals/TableLeadersInIntervals';
import NavBarLeadersGender from '../../components/UI/NavBarLeadersGender/NavBarLeadersGender';
import FilterIntervalsForLeader from '../../components/UI/Filters/FilterInterval/FilterIntervalsForLeader';

import styles from './Statistics.module.css';

// отображаемые интервалы, соответствуют данным, приходящим с сервера
const intervals = [15, 60, 300, 1200];

function LeadersInIntervals() {
  useTitle('Рейтинг райдеров по мощности');

  // определение страницы для мужчин или женщин
  const { pathname } = useLocation();
  const gender = pathname.includes('/female') ? 'female' : 'male';

  const { maxWatts, maxWattsPerKg } = useSelector((state) => state.leadersInIntervalsFetch);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeadersInIntervals(gender));
    return () => dispatch(resetLeadersInIntervals());
  }, [gender]);

  return (
    <div>
      <div className={styles.navigation}>
        <NavBarLeadersGender addCls={'mb15'} />
        <FilterIntervalsForLeader intervals={intervals} />
      </div>
      {maxWatts?.length ? (
        <section>
          <h2>Лидеры по абсолютным ваттам за 90 дней </h2>
          <article className={styles.block__table}>
            <TableLeadersInIntervals
              leadersInIntervals={maxWatts}
              intervals={intervals}
              type={'watts'}
            />
          </article>
        </section>
      ) : null}
      {maxWatts?.length ? (
        <section>
          <h2>Лидеры по удельной мощности за 90 дней</h2>
          <article className={styles.block__table}>
            <TableLeadersInIntervals
              leadersInIntervals={maxWattsPerKg}
              intervals={intervals}
              type={'wattsPerKg'}
            />
          </article>
        </section>
      ) : null}
    </div>
  );
}

export default LeadersInIntervals;
