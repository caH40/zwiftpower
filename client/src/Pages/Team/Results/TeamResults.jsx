import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchGetRiderResults } from '../../../redux/features/api/team/fetchTeam';
import { resetTeamRiderResults } from '../../../redux/features/api/team/teamSlice';
import { records } from '../../../assets/constants';
import { lsTeamRiderResults } from '../../../constants/localstorage';
import PaginationSelect from '../../../components/UI/PaginationSelect/PaginationSelect';
import Pagination from '../../../components/UI/Pagination/Pagination';
import TableTeamRiderResults from '../../../components/Tables/TableTeamRiderResults/TableTeamRiderResults';
import useTitle from '../../../hook/useTitle';
import { HelmetTeamRiderResults } from '../../../components/Helmets/HelmetTeamRiderResults';
import SkeletonTable from '../../../components/SkeletonLoading/SkeletonTable/SkeletonTable';

import styles from './TeamResults.module.css';

export default function TeamResultsPage() {
  const { urlSlug } = useParams();
  const { team } = useSelector((state) => state.team);
  useTitle(`Результаты ${team ? ' ' + team.name : ''}`);
  const [page, setPage] = useState(1);
  const initialDocsOnPage = localStorage.getItem(lsTeamRiderResults) || 20;

  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);

  const {
    quantityPages,
    status: statusResults,
    teamRiderResults: results,
  } = useSelector((state) => state.team);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem(lsTeamRiderResults, docsOnPage);
    dispatch(fetchGetRiderResults({ urlSlug, docsOnPage, page }));

    return () => {
      dispatch(resetTeamRiderResults());
    };
  }, [page, urlSlug, docsOnPage, dispatch]);

  return (
    <div className={styles.wrapper}>
      <HelmetTeamRiderResults
        teamName={team?.name}
        urlSlug={urlSlug}
        imageUrl={team?.logoUrls?.original}
      />

      <div className={styles.control}>
        <PaginationSelect
          docsOnPage={docsOnPage}
          setDocsOnPage={setDocsOnPage}
          records={records}
          setPage={setPage}
        />
      </div>

      <>
        <section className={styles.wrapper__wide}>
          {/* Скелетон загрузки для Таблицы */}
          <SkeletonTable status={statusResults} rows={+docsOnPage} height={45} />

          {statusResults === 'resolved' && <TableTeamRiderResults results={results} />}
        </section>

        {quantityPages > 1 && (
          <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
        )}
      </>
    </div>
  );
}
