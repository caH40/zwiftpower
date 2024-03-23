import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUserResults } from '../../redux/features/api/userResultsSlice';
import TableUserResults from '../../components/Tables/TableUserResults/TableUserResults';
import NavBarResultsRaceTable from '../../components/UI/NavBarResultsRaceTable/NavBarResultsRaceTable';
import ProfileBlock from '../../components/ProfileBlock/ProfileBlock';
import CPBlock from '../../components/CPBlock/CPBlock';
import { HelmetProfile } from '../../components/Helmets/HelmetProfile';
import Pagination from '../../components/UI/Pagination/Pagination';

import styles from './Profile.module.css';

const notFound = 'Заезды не найдены ... ((';

function ProfileResults() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { zwiftId } = useParams();
  const userAuth = useSelector((state) => state.checkAuth.value);

  const { results, powerCurve, profile, status, quantityPages } = useSelector(
    (state) => state.fetchUserResults
  );

  const initialDocsOnPage = localStorage.getItem('recordsOnPageProfileResults') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);

  useEffect(() => {
    localStorage.setItem('recordsOnPageProfileResults', docsOnPage);
    dispatch(fetchUserResults({ zwiftId, page, docsOnPage, quantityPages }));
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
      {status === 'resolved' && (
        <>
          <ProfileBlock quantityRace={results?.length || 0} profile={profile} />
          <div className={styles.block__cp}>
            <CPBlock criticalPowers={powerCurve?.pointsWattsPerKg} label={'wattsPerKg'} />
            <CPBlock criticalPowers={powerCurve?.pointsWatts} label={'watts'} />
          </div>
        </>
      )}
      {!!results.length && status === 'resolved' && (
        <>
          <NavBarResultsRaceTable
            results={results}
            hideCategory={true}
            docsOnPage={docsOnPage}
            setDocsOnPage={setDocsOnPage}
            setPage={setPage}
          />

          <section className={styles.block__results}>
            <TableUserResults results={results} />
          </section>
          {quantityPages > 1 && (
            <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
          )}
        </>
      )}

      {!results?.length && status === 'resolved' ? (
        <div className={styles.title__notFound}>{notFound}</div>
      ) : null}
    </div>
  );
}

export default ProfileResults;
