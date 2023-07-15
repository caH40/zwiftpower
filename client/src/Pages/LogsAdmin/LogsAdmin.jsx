import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableLogsAdmin from '../../components/Tables/TableLogsAdmins/TableLogsAdmins';
import { fetchLogsAdmins } from '../../redux/features/api/logsAdminsSlice';
import Pagination from '../../components/UI/Pagination/Pagination';
import FilterBoxForTable from '../../components/UI/FilterBoxForTable/FilterBoxForTable';

import styles from './LogsAdmin.module.css';

function LogsAdmin() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const initialDocsOnPage = localStorage.getItem('recordsOnPageLogs') || 20;
  const [docsOnPage, setDocsOnPage] = useState(initialDocsOnPage);

  useTitle('Логи действий с Эвентами');
  useBackground(false);
  const { logs, quantityPages } = useSelector((state) => state.logsAdmins);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('recordsOnPageLogs', docsOnPage);
    dispatch(fetchLogsAdmins({ page, docsOnPage, search }));
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
          <TableLogsAdmin logs={logs} />
          <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
        </>
      )}
    </section>
  );
}

export default LogsAdmin;
