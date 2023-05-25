import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUserResults } from '../../redux/features/api/userResultsSlice';
import TableUserResults from '../../components/Tables/TableUserResults/TableUserResults';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';
import ProfileBlock from '../../components/ProfileBlock/ProfileBlock';

import styles from './Profile.module.css';

const notFound = 'Заезды не найдены ... ((';

function ProfileResults() {
  const dispatch = useDispatch();
  const { zwiftId } = useParams();
  const userAuth = useSelector((state) => state.checkAuth.value);
  const { results, profile } = useSelector((state) => state.fetchUserResults);

  useEffect(() => {
    const currentZwiftId = zwiftId === 'me' ? userAuth.user.zwiftId : zwiftId;
    dispatch(fetchUserResults({ zwiftId: currentZwiftId }));
  }, [dispatch, zwiftId, userAuth]);
  return (
    <div>
      <ProfileBlock results={results} profile={profile} />
      {results?.length ? (
        <>
          <NavBarResultsRace results={results} hideCategory={true} />
          <TableUserResults results={results} />
        </>
      ) : (
        <div className={styles.title__notFound}>{notFound}</div>
      )}
    </div>
  );
}

export default ProfileResults;
