import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CheckBoxTotal } from '../../UI/CheckBoxForArray/CheckboxTotal';
import { CheckBoxForArray } from '../../UI/CheckBoxForArray/CheckBoxForArray';
import { getTimerLocal } from '../../../utils/date-local';

import styles from '../Table.module.css';

import Thead from './Thead';

function TableLogsErrors({ checkedTotal, arrayId, setArrayId, logs }) {
  const navigate = useNavigate();

  const getNavigate = (id) => {
    navigate(`/logs/errors/${id}`);
  };

  return (
    <>
      <table className={styles.table}>
        <Thead />
        <tbody>
          {logs?.map((log) => (
            <tr className={styles.trLink} key={log._id}>
              <td className={styles.clear}>
                <CheckBoxForArray
                  checkedTotal={checkedTotal}
                  arrayId={arrayId}
                  setArrayId={setArrayId}
                  id={log._id}
                />
              </td>
              <td onClick={() => getNavigate(log._id)}>
                {getTimerLocal(log.timestamp, 'DDMMYYHm')}
              </td>
              <td onClick={() => getNavigate(log._id)}>{log.message}</td>
              <td onClick={() => getNavigate(log._id)}>{log.type}</td>
              <td onClick={() => getNavigate(log._id)}>{log.responseData}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableLogsErrors;
