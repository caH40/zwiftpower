import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import TableLogsErrors from '../../components/Tables/TableLogsErrors/TableLogsErrors';
import { fetchLogsErrors, resetLogsErrors } from '../../redux/features/api/logsErrorsSlice';
import Pagination from '../../components/UI/Pagination/Pagination';
import FilterBoxForTable from '../../components/UI/FilterBoxForTable/FilterBoxForTable';

import styles from './LogsErrors.module.css';

function LogsErrors() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const initialDocsOnPage = localStorage.getItem('recordsOnPageLogs') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);
  useTitle('Логи ошибок на сервере');
  const { logs, quantityPages } = useSelector((state) => state.logsErrors);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('recordsOnPageLogs', docsOnPage);
    dispatch(fetchLogsErrors({ page, docsOnPage, search }));

    return () => {
      dispatch(resetLogsErrors());
    };
  }, [dispatch, page, docsOnPage, search]);
  return (
    <section className={styles.wrapper}>
      <div className={styles.align__right}>
        <FilterBoxForTable
          search={search}
          setSearch={setSearch}
          docsOnPage={docsOnPage}
          setDocsOnPage={setDocsOnPage}
          placeholder={'поиск'}
          setPage={setPage}
        />
      </div>
      {logs[0] && (
        <>
          <TableLogsErrors logs={logs} />
          <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
        </>
      )}
    </section>
  );
}

export default LogsErrors;
