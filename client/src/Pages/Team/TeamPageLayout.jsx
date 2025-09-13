import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetTeam } from '../../redux/features/api/team/fetchTeam';
import { allowForTeamCreator } from '../../utils/check-team-creator';
import { resetTeam } from '../../redux/features/api/team/teamSlice';
import { NavBarTeamPublic } from '../../components/UI/NavBarTeamPublic/NavBarTeamPublic';
import TeamHeader from '../../components/TeamHeader/TeamHeader';

import styles from './TeamPageLayout.module.css';

export default function TeamPage() {
  const { urlSlug } = useParams();
  const { team } = useSelector((state) => state.team);
  const {
    status,
    user: { team: userInTeam },
  } = useSelector((state) => state.checkAuth.value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetTeam({ urlSlug }));

    return () => dispatch(resetTeam());
  }, []);

  const isCreator = allowForTeamCreator({ status, teamIdForPermission: team?._id, userInTeam });
  return (
    <div className={styles.wrapper}>
      {team && <TeamHeader team={team} />}

      {/* Кнопки навигации по страницам организатора */}
      <div className={styles.box__navbar}>
        <NavBarTeamPublic urlSlug={team?.urlSlug} isCreator={isCreator} />
      </div>

      <Outlet />
    </div>
  );
}
