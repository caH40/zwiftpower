import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetTeam } from '../../redux/features/api/team/fetchTeam';
import { resetTeam } from '../../redux/features/api/team/teamSlice';

export default function TeamPage() {
  const { urlSlug } = useParams();
  const { team } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetTeam({ urlSlug }));

    return () => dispatch(resetTeam());
  }, []);

  console.log(team);

  return <div>Team</div>;
}
