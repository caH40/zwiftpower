import styles from '../Table.module.css';

import { getTimerLocal } from '../../../utils/date-local';

import Thead from './Thead';

function TableLogsErrors({ logs }) {
  return (
    <table className={styles.table}>
      <Thead />
      <tbody>
        {logs?.map((log) => (
          <tr key={log._id}>
            <td>{getTimerLocal(log.timestamp, 'DDMMYYHm')}</td>
            <td>{log.message}</td>
            <td>{log.type}</td>
            <td>{log.responseData}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableLogsErrors;
