import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableLogsAdmin from '../../components/Tables/TableLogsAdmins/TableLogsAdmins';
import { fetchLogsAdmins } from '../../redux/features/api/logsAdminsSlice';

import styles from './LogsAdmin.module.css';

function LogsAdmin() {
  useTitle('Логи действий с Эвентами');
  useBackground(false);
  const { logs } = useSelector((state) => state.logsAdmins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLogsAdmins());
  }, [dispatch]);
  return (
    <section className={styles.wrapper}>
      <TableLogsAdmin logs={logs} />
    </section>
  );
}

export default LogsAdmin;
