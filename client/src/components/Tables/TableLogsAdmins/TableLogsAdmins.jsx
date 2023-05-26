import React from 'react';

import styles from '../Table.module.css';

import { useResize } from '../../../hook/use-resize';
import { getStringDate } from '../../../utils/format-date';
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
            <td>{getStringDate(log.date)}</td>
            <td>{log.userId?.username || 'deleted'}</td>
            <td>{descriptionLogsAdmins[log.description]}</td>
            {sm && <td>{log.event.id}</td>}
            <td>{log.event.name}</td>
            {sm && <td>{getStringDate(log.event.start)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableLogsAdmin;
