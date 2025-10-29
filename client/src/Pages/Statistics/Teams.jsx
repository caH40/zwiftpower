import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { STATISTICS_HELMET_PROPS } from '../../assets/helmet-props';

import styles from './Statistics.module.css';
/**
 * Страница статистики команд.
 */
export default function TeamsStatistics() {
  // const { status, teams } = useSelector((state) => state.teamsRanking);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => dispatch();
  // }, [dispatch]);

  useTitle('Рейтинг команд');
  return (
    <section className={styles.wrapper}>
      <HelmetComponent {...STATISTICS_HELMET_PROPS.TEAM_STATISTICS} />
      Teams
    </section>
  );
}
