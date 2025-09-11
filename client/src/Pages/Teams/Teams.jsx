import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { helmetProps } from '../../assets/helmet-props';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { shuffleArray } from '../../utils/shuffle';
import { fetchGetTeams } from '../../redux/features/api/team/fetchTeam';
import { resetTeams } from '../../redux/features/api/team/teamSlice';
import useTitle from '../../hook/useTitle';
import ButtonLocalUrl from '../../components/UI/ButtonUrl/ButtonLocalUrl';

import styles from './Teams.module.css';

/**
 * Страница велосипедных команд в Звифте.
 */
export default function TeamsPublic() {
  useTitle('Команды');

  // Данные организаторов из хранилища редакс.
  const { teams } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  console.log(teams);

  // // Случайная перестановка организаторов в массиве для изменения последовательности отображения карточек Teams.
  const shuffledTeams = useMemo(() => {
    return shuffleArray(teams);
  }, [teams]);

  // Запрос на получение списка команд.
  useEffect(() => {
    dispatch(fetchGetTeams());

    return () => dispatch(resetTeams());
  }, []);

  return (
    <div className={styles.wrapper}>
      <HelmetComponent {...helmetProps.TEAMS_PUBLIC} />
      <div className={styles.control}>
        <ButtonLocalUrl href="/teams/create">Создать команду</ButtonLocalUrl>
      </div>

      {!!shuffledTeams?.length && <section className={styles.cards}></section>}
    </div>
  );
}
