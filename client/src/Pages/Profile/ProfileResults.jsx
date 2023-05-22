import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUserResults } from '../../redux/features/api/userResultsSlice';
import TableUserResults from '../../components/Tables/TableUserResults/TableUserResults';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';

function ProfileResults() {
  const dispatch = useDispatch();
  const { zwiftId } = useParams();
  const { results, profile } = useSelector((state) => state.fetchUserResults);

  useEffect(() => {
    dispatch(fetchUserResults({ zwiftId }));
  }, [dispatch, zwiftId]);
  return (
    <div>
      <NavBarResultsRace results={results} hideCategory={true} />
      <TableUserResults results={results} />
    </div>
  );
}

export default ProfileResults;
