import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUserResults } from '../../redux/features/api/userResultsSlice';

function ProfileResults() {
  const dispatch = useDispatch();
  const { zwiftId } = useParams();
  const results = useSelector((state) => state.fetchUserResults);
  console.log(results);

  useEffect(() => {
    dispatch(fetchUserResults({ zwiftId }));
  }, [dispatch, zwiftId]);
  return <div>ProfileResults</div>;
}

export default ProfileResults;
