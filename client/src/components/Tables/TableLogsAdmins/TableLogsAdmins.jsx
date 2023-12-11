import React from 'react';

import styles from '../Table.module.css';

import { useResize } from '../../../hook/use-resize';
import { getTimerLocal } from '../../../utils/date-local';
import { descriptionLogsAdmins } from '../../../assets/logs/admins';
import { CheckBoxForArray } from '../../UI/CheckBoxForArray/CheckBoxForArray';

import Thead from './Thead';

function TableLogsAdmin({ checkedTotal, arrayId, setArrayId, logs }) {
  const { isScreenLg: lg, isScreenSm: sm } = useResize();

  return (
    <table className={styles.table}>
      <Thead lg={lg} sm={sm} />
      <tbody>
        {logs?.map((log) => (
          <tr key={log._id}>
            <td className={styles.clear}>
              <CheckBoxForArray
                checkedTotal={checkedTotal}
                arrayId={arrayId}
                setArrayId={setArrayId}
                id={log._id}
              />
            </td>
            <td>{getTimerLocal(log.date, 'DDMMYYHm')}</td>
            {sm && <td>{log.userId?.username || 'deleted'}</td>}
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
