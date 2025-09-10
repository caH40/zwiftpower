import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { helmetProps } from '../../assets/helmet-props';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { shuffleArray } from '../../utils/shuffle';
import useTitle from '../../hook/useTitle';

import styles from './Teams.module.css';

/**
 * Страница велосипедных команд в Звифте.
 */
export default function TeamsPublic() {
  useTitle('Команды');

  // // Данные организаторов из хранилища редакс.
  // const { teams } = useSelector();

  // // Случайная перестановка организаторов в массиве для изменения последовательности отображения карточек Teams.
  // const shuffledTeams = useMemo(() => {
  //   return shuffleArray(teams);
  // }, [teams]);

  // const dispatch = useDispatch();

  // // Запрос на получение списка команд.
  // useEffect(() => {
  //   dispatch();

  //   return () => dispatch();
  // }, []);

  return (
    <div className={styles.wrapper}>
      <HelmetComponent {...helmetProps.TEAMS_PUBLIC} />

      {/* {!!shuffledTeams?.length && <section className={styles.cards}></section>} */}
    </div>
  );
}
