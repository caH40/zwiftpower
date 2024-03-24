import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUserProfile, resetUserProfile } from '../../redux/features/api/userProfileSlice';
import { fetchUserResults, resetUserResults } from '../../redux/features/api/userResultsSlice';
import TableUserResults from '../../components/Tables/TableUserResults/TableUserResults';
import NavBarResultsRaceTable from '../../components/UI/NavBarResultsRaceTable/NavBarResultsRaceTable';
import ProfileBlock from '../../components/ProfileBlock/ProfileBlock';
import CPBlock from '../../components/CPBlock/CPBlock';
import { HelmetProfile } from '../../components/Helmets/HelmetProfile';
import Pagination from '../../components/UI/Pagination/Pagination';

import styles from './Profile.module.css';

function ProfileResults() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { zwiftId } = useParams();
  const userAuth = useSelector((state) => state.checkAuth.value);

  const {
    powerCurve,
    profile,
    quantityRace,
    status: statusProfile,
  } = useSelector((state) => state.fetchUserProfile);
  const {
    results,
    quantityPages,
    status: statusResults,
  } = useSelector((state) => state.fetchUserResults);

  const initialDocsOnPage = localStorage.getItem('recordsOnPageProfileResults') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);

  // получение профиля райдера
  useEffect(() => {
    dispatch(fetchUserProfile({ zwiftId }));

    return () => dispatch(resetUserProfile());
  }, [dispatch, zwiftId, userAuth]);

  // получение результатов райдера
  useEffect(() => {
    localStorage.setItem('recordsOnPageProfileResults', docsOnPage);
    dispatch(fetchUserResults({ zwiftId, page, docsOnPage }));

    return () => dispatch(resetUserResults());
  }, [dispatch, zwiftId, userAuth, page, docsOnPage]);

  return (
    <div>
      <HelmetProfile
        profileId={zwiftId}
        firstName={profile.firstName}
        lastName={profile.lastName}
        image={profile.imageSrc}
        page={'results'}
      />
      {statusProfile === 'resolved' && (
        <>
          <ProfileBlock profile={profile} quantityRace={quantityRace || 0} />
          <div className={styles.block__cp}>
            <CPBlock criticalPowers={powerCurve?.pointsWattsPerKg} label={'wattsPerKg'} />
            <CPBlock criticalPowers={powerCurve?.pointsWatts} label={'watts'} />
          </div>
        </>
      )}

      <NavBarResultsRaceTable
        results={results}
        hideCategory={true}
        docsOnPage={docsOnPage}
        setDocsOnPage={setDocsOnPage}
        setPage={setPage}
      />

      <section className={styles.block__results}>
        <TableUserResults results={results} status={statusResults} docsOnPage={+docsOnPage} />
      </section>
      {quantityPages > 1 && (
        <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
      )}
    </div>
  );
}

export default ProfileResults;
