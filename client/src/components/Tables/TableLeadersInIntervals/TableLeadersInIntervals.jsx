import { useSelector } from 'react-redux';

import { getIntervalName } from '../../../utils/intervals';
import styles from '../Table.module.css';

import Thead from './Thead';
import TrBlock from './TrBlock';

function TableLeadersInIntervals({ leadersInIntervals, type }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const { column: interval } = useSelector((state) => state.filterIntervalsForLeader.value);
  const isAdmin = ['admin'].includes(role);

  return (
    <table className={styles.table}>
      <caption className={styles.hidden}>Лидеры по мощности за определенные интервалы</caption>
      <Thead type={type} isAdmin={isAdmin} />
      <tbody>
        <tr>
          <td className={styles.td__interval} colSpan={6}>
            {getIntervalName(interval)}
          </td>
        </tr>
        {leadersInIntervals
          .filter((result) => result.interval === interval)
          .map((result, index) => (
            <TrBlock
              result={result}
              index={index}
              type={type}
              key={result.zwiftId}
              isAdmin={isAdmin}
            />
          ))}
      </tbody>
    </table>
  );
}

export default TableLeadersInIntervals;
