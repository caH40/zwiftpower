import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { STATISTICS_HELMET_PROPS } from '../../assets/helmet-props';
import {
  fetchTeamParticipantRatingResults,
  fetchTeamsLeaderboard,
} from '../../redux/features/api/team/fetchTeam';
import { resetTeamsLeaderboard } from '../../redux/features/api/team/teamSlice';
import useTitle from '../../hook/useTitle';
import TableTeamRanking from '../../components/Tables/TableTeamRanking/TableTeamRanking';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';
import { openPopupFormContainer } from '../../redux/features/popupFormContainerSlice';
import { getAlert } from '../../redux/features/alertMessageSlice';

import styles from './Statistics.module.css';

// Существует только один сезон.
const seasonLabel = '2025-2026';

/**
 * Страница статистики команд.
 */
export default function TeamsStatistics() {
  useTitle('Рейтинг команд');
  const { status, teamsLeaderboard } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const showResults = (results) =>
    dispatch(
      openPopupFormContainer({
        formType: 'teamParticipantRatingModal',
        formProps: { results },
      })
    );

  const getParticipantRatingResults = ({ seasonLabel, teamUrlSlug }) => {
    async function start() {
      try {
        const res = await dispatch(
          fetchTeamParticipantRatingResults({
            seasonLabel,
            teamUrlSlug,
          })
        ).unwrap();

        showResults(res.data);
      } catch (error) {
        dispatch(getAlert({ message: error, type: 'error', isOpened: true }));
      }
    }
    start();
  };

  useEffect(() => {
    dispatch(fetchTeamsLeaderboard({ seasonLabel }));

    return () => {
      dispatch(resetTeamsLeaderboard());
    };
  }, [dispatch]);

  return (
    <section className={styles.wrapper}>
      <HelmetComponent {...STATISTICS_HELMET_PROPS.TEAM_STATISTICS} />

      <article className={styles.block__table}>
        {/* Скелетон загрузки для Таблицы */}
        <SkeletonTable status={status} rows={10} height={70} />

        {status === 'resolved' ? (
          <TableTeamRanking
            teams={teamsLeaderboard}
            getParticipantRatingResults={getParticipantRatingResults}
            seasonLabel={seasonLabel}
          />
        ) : null}
      </article>
    </section>
  );
}
