import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetTeam } from '../../redux/features/api/team/fetchTeam';
import { resetTeam } from '../../redux/features/api/team/teamSlice';
import { NavBarTeamPublic } from '../../components/UI/NavBarTeamPublic/NavBarTeamPublic';
import TeamHeader from '../../components/TeamHeader/TeamHeader';

import styles from './TeamPageLayout.module.css';

export default function TeamPage() {
  const { urlSlug } = useParams();
  const { team } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetTeam({ urlSlug }));

    return () => dispatch(resetTeam());
  }, []);

  return (
    <div className={styles.wrapper}>
      {team && <TeamHeader team={team} />}

      {/* Кнопки навигации по страницам организатора */}
      <div className={styles.box__navbar}>
        <NavBarTeamPublic urlSlug={team?.urlSlug} />
      </div>

      <Outlet />
    </div>
  );
}
