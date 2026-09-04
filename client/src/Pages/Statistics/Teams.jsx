import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { STATISTICS_HELMET_PROPS } from '../../assets/helmet-props';
import {
  fetchTeamParticipantRatingResults,
  fetchTeamsLeaderboard,
} from '../../redux/features/api/team/fetchTeam';
import useTitle from '../../hook/useTitle';
import TableTeamRanking from '../../components/Tables/TableTeamRanking/TableTeamRanking';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';
import SimpleSelectFunction from '../../components/UI/SimpleSelect/SimpleSelectFunction';
import { resetTeamsLeaderboard } from '../../redux/features/api/team/teamSlice';
import { openPopupFormContainer } from '../../redux/features/popupFormContainerSlice';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { setFilterSeason } from '../../redux/features/filterSeason';
import { optionsSeasons } from '../../assets/options';

import styles from './Statistics.module.css';

/**
 * Страница статистики команд.
 */
export default function TeamsStatistics() {
  useTitle('Рейтинг команд');
  const { status, teamsLeaderboard } = useSelector((state) => state.team);

  const {
    value: { seasonLabel },
  } = useSelector((state) => state.filterSeason);

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
  }, [dispatch, seasonLabel]);

  return (
    <section className={styles.wrapper}>
      <HelmetComponent {...STATISTICS_HELMET_PROPS.TEAM_STATISTICS} />

      <article className={styles.block__table}>
        <div className={styles.box__filter}>
          <SimpleSelectFunction
            reducer={(name) => dispatch(setFilterSeason({ name }))}
            options={optionsSeasons}
            value={seasonLabel}
            closeEmptyOption={true}
          />
        </div>

        {/* Скелетон загрузки для Таблицы */}
        {teamsLeaderboard.length === 0 ? (
          <SkeletonTable status={status} rows={10} height={70} />
        ) : null}

        {teamsLeaderboard.length > 0 ? (
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
