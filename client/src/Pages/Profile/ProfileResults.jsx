import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUserResults } from '../../redux/features/api/userResultsSlice';
import TableUserResults from '../../components/Tables/TableUserResults/TableUserResults';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';
import ProfileBlock from '../../components/ProfileBlock/ProfileBlock';
import CPBlock from '../../components/CPBlock/CPBlock';

import styles from './Profile.module.css';

const notFound = 'Заезды не найдены ... ((';

function ProfileResults() {
  const dispatch = useDispatch();
  const { zwiftId } = useParams();
  const userAuth = useSelector((state) => state.checkAuth.value);
  const { results, powerCurve, profile, status } = useSelector(
    (state) => state.fetchUserResults
  );

  useEffect(() => {
    const currentZwiftId = zwiftId === 'me' ? userAuth.user.zwiftId : zwiftId;
    if (!currentZwiftId) return;
    dispatch(fetchUserResults({ zwiftId: currentZwiftId }));
  }, [dispatch, zwiftId, userAuth]);

  return (
    <div>
      {status === 'resolved' && (
        <>
          <ProfileBlock results={results} profile={profile} />
          <div className={styles.block__cp}>
            <CPBlock criticalPowers={powerCurve.pointsWattsPerKg} label={'wattsPerKg'} />
            <CPBlock criticalPowers={powerCurve.pointsWatts} label={'watts'} />
          </div>
        </>
      )}
      {results?.length && status === 'resolved' ? (
        <section className={styles.block__results}>
          <NavBarResultsRace results={results} hideCategory={true} />
          <TableUserResults results={results} />
        </section>
      ) : null}

      {!results?.length && status === 'resolved' ? (
        <div className={styles.title__notFound}>{notFound}</div>
      ) : null}
    </div>
  );
}

export default ProfileResults;
