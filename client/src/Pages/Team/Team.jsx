import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetTeam } from '../../redux/features/api/team/fetchTeam';
import { resetTeam } from '../../redux/features/api/team/teamSlice';
import TeamHeader from '../../components/TeamHeader/TeamHeader';

import styles from './Team.module.css';

export default function TeamPage() {
  const { urlSlug } = useParams();
  const { team } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetTeam({ urlSlug }));

    return () => dispatch(resetTeam());
  }, []);

  return <div className={styles.wrapper}>{team && <TeamHeader team={team} />}</div>;
}
