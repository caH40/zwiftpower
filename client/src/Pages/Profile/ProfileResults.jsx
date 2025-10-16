import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUserResults, resetUserResults } from '../../redux/features/api/userResultsSlice';
import TableUserResults from '../../components/Tables/TableUserResults/TableUserResults';
import NavBarResultsRaceTable from '../../components/UI/NavBarResultsRaceTable/NavBarResultsRaceTable';
import CPBlock from '../../components/CPBlock/CPBlock';
import { HelmetProfile } from '../../components/Helmets/HelmetProfile';
import Pagination from '../../components/UI/Pagination/Pagination';
import SkeletonProfileCPBlock from '../../components/SkeletonLoading/SkeletonProfileBlock/SkeletonProfileCPBlock';
import SkeletonTable from '../../components/SkeletonLoading/SkeletonTable/SkeletonTable';
import { useInitialUserResultsSettings } from '../../hook/useInitialUserResultsSettings';
import { useLocalStorageSetUserResults } from '../../hook/useLocalStorageSetUserResults';

import styles from './Profile.module.css';

function ProfileResults() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { zwiftId } = useParams();
  const userAuth = useSelector((state) => state.checkAuth.value);
  const isMounting = useRef(true);
  const { activeSorting } = useSelector((state) => state.sortTable);
  const wattsState = useSelector((state) => state.filterWatts.value);

  const {
    powerCurve,
    profile,
    status: statusProfile,
  } = useSelector((state) => state.fetchUserProfile);
  const {
    results,
    quantityPages,
    status: statusResults,
  } = useSelector((state) => state.fetchUserResults);

  // Инициализация данных из Локального хранилища.
  const { docsOnPage, setDocsOnPage } = useInitialUserResultsSettings();

  // Сохранение данных в Локальном хранилище.
  useLocalStorageSetUserResults({ docsOnPage, activeSorting, isMounting });

  // получение результатов райдера
  useEffect(() => {
    if (!activeSorting) {
      return undefined;
    }
    let { columnName } = activeSorting;

    // Если columnName является числом, значит это CP, добавляем префикс.
    if (typeof columnName === 'number') {
      columnName = `cp-${wattsState.column}-${activeSorting.columnName}`;
    }

    dispatch(
      fetchUserResults({
        zwiftId,
        page,
        docsOnPage,
        columnName,
        isRasing: activeSorting.isRasing,
        additionalColumnName: wattsState.column,
      })
    );

    return () => {
      dispatch(resetUserResults());
    };
  }, [dispatch, zwiftId, userAuth, activeSorting, page, docsOnPage, wattsState]);

  return (
    <div>
      <HelmetProfile
        profileId={zwiftId}
        firstName={profile.firstName}
        lastName={profile.lastName}
        image={profile.imageSrc}
        page={'results'}
      />
      <SkeletonProfileCPBlock status={statusProfile} />
      {statusProfile === 'resolved' && (
        <div className={styles.block__cp}>
          <CPBlock criticalPowers={powerCurve?.pointsWattsPerKg} label={'wattsPerKg'} />
          <CPBlock criticalPowers={powerCurve?.pointsWatts} label={'watts'} />
        </div>
      )}

      <NavBarResultsRaceTable
        results={results}
        hideCategory={true}
        docsOnPage={docsOnPage}
        setDocsOnPage={setDocsOnPage}
        setPage={setPage}
      />
      {/* Скелетон загрузки для Таблицы */}
      <SkeletonTable status={statusResults} rows={+docsOnPage} height={30} />

      {statusResults === 'resolved' && (
        <>
          <section className={styles.block__results}>
            <TableUserResults results={results} />
          </section>

          {quantityPages > 1 && (
            <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
          )}
        </>
      )}
    </div>
  );
}

export default ProfileResults;
