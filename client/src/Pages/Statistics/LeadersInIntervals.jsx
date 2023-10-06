import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useBackground from '../../hook/useBackground';
import useTitle from '../../hook/useTitle';
import { fetchLeadersInIntervals } from '../../redux/features/api/leadersInIntervals/fetchLeadersInIntervals';
import { resetLeadersInIntervals } from '../../redux/features/api/leadersInIntervals/leadersInIntervalsSlice';
import TableLeadersInIntervals from '../../components/Tables/TableLeadersInIntervals/TableLeadersInIntervals';
import NavBarLeadersGender from '../../components/UI/NavBarLeadersGender/NavBarLeadersGender';

import styles from './Statistics.module.css';

function LeadersInIntervals() {
  useTitle('Рейтинг райдеров по мощности');
  useBackground(false);

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
      <NavBarLeadersGender addCls={'mb15'} />
      {maxWatts?.length ? (
        <section>
          <h2>Лидеры по абсолютным ваттам</h2>
          <article className={styles.block__table}>
            <TableLeadersInIntervals leadersInIntervals={maxWatts} type={'watts'} />
          </article>
        </section>
      ) : null}
      {maxWatts?.length ? (
        <section>
          <h2>Лидеры по удельной мощности</h2>
          <article className={styles.block__table}>
            <TableLeadersInIntervals leadersInIntervals={maxWattsPerKg} type={'wattsPerKg'} />
          </article>
        </section>
      ) : null}
    </div>
  );
}

export default LeadersInIntervals;
