import { useNavigate } from 'react-router-dom';

import styles from '../Table.module.css';

import { getTimerLocal } from '../../../utils/date-local';

import Thead from './Thead';

function TableLogsErrors({ logs }) {
  const navigate = useNavigate();

  const getNavigate = (id) => {
    navigate(`/logs/errors/${id}`);
  };

  return (
    <table className={styles.table}>
      <Thead />
      <tbody>
        {logs?.map((log) => (
          <tr onClick={() => getNavigate(log._id)} className={styles.trLink} key={log._id}>
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
