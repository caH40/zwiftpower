import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableLogsAdmin from '../../components/Tables/TableLogsAdmins/TableLogsAdmins';
import { fetchLogsAdmins } from '../../redux/features/api/logsAdminsSlice';
import Pagination from '../../components/UI/Pagination/Pagination';

import styles from './LogsAdmin.module.css';

function LogsAdmin() {
  const [page, setPage] = useState(1);
  useTitle('Логи действий с Эвентами');
  useBackground(false);
  const { logs, quantityPages } = useSelector((state) => state.logsAdmins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLogsAdmins({ page, docsOnPage: 25 }));
  }, [dispatch, page]);
  return (
    <section className={styles.wrapper}>
      <TableLogsAdmin logs={logs} />
      <Pagination quantityPages={quantityPages} page={page} setPage={setPage} />
    </section>
  );
}

export default LogsAdmin;
