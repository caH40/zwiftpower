import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SkeletonTeamCard } from '../../components/SkeletonLoading/SkeletonTeamCard/SkeletonTeamCard';
import { renderSkeletonCards } from '../../utils/skeleton-cards';
import { helmetProps } from '../../assets/helmet-props';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { shuffleArray } from '../../utils/shuffle';
import { fetchGetTeams } from '../../redux/features/api/team/fetchTeam';
import { resetTeams } from '../../redux/features/api/team/teamSlice';
import useTitle from '../../hook/useTitle';
import CardTeam from '../../components/CardTeam/CardTeam';
import ButtonLocalUrl from '../../components/UI/ButtonUrl/ButtonLocalUrl';

import styles from './Teams.module.css';

/**
 * Страница велосипедных команд в Звифте.
 */
export default function TeamsPublic() {
  useTitle('Команды');

  const {
    status,
    user: { team: userInTeam, zwiftId },
  } = useSelector((state) => state.checkAuth.value);

  // Данные организаторов из хранилища редакс.
  const { status: fetchTeamsStatus, teams } = useSelector((state) => state.team);
  const dispatch = useDispatch();

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

      {/* Для отображения кнопки пользователь должен */}
      {/* быть авторизован,не должен состоять ни в одной команде, к профилю должен быть привязан ZwiftId */}
      {status && !userInTeam?.id && zwiftId && (
        <div className={styles.control}>
          <ButtonLocalUrl href="/moderation/teams/create">Создать команду</ButtonLocalUrl>
        </div>
      )}

      <section className={styles.cards}>
        {renderSkeletonCards({
          count: 3,
          SkeletonComponent: SkeletonTeamCard,
          status: fetchTeamsStatus,
        })}

        {!!shuffledTeams?.length && teams.map((team) => <CardTeam key={team._id} {...team} />)}
      </section>
    </div>
  );
}
