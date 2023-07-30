import React from 'react';

import styles from '../Table.module.css';

import { useResize } from '../../../hook/use-resize';
import { getTimerLocal } from '../../../utils/date-local';
import { descriptionLogsAdmins } from '../../../asset/logs/admins';

import Thead from './Thead';

function TableLogsAdmin({ logs }) {
  const { isScreenLg: lg, isScreenSm: sm } = useResize();

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <Thead lg={lg} sm={sm} />
      <tbody>
        {logs?.map((log) => (
          <tr key={log._id}>
            <td>{getTimerLocal(log.date, 'DDMMYYHm')}</td>
            <td>{log.userId?.username || 'deleted'}</td>
            <td>{descriptionLogsAdmins[log.description]}</td>
            {sm && <td>{log.event.id}</td>}
            <td>{log.event.name}</td>
            {sm && <td>{getTimerLocal(log.event.start, 'DDMMYYHm')}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableLogsAdmin;
