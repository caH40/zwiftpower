import { useSelector } from 'react-redux';

import { getIntervalName } from '../../../utils/intervals';
import styles from '../Table.module.css';

import Thead from './Thead';
import TrBlock from './TrBlock';

function TableLeadersInIntervals({ leadersInIntervals, type }) {
  const { column: interval } = useSelector((state) => state.filterIntervalsForLeader.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);
  return (
    <table className={styles.table}>
      <caption className={styles.hidden}>Лидеры по мощности за определенные интервалы</caption>
      <Thead type={type} />
      <tbody>
        <tr>
          <td className={styles.td__interval} colSpan={5}>
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
              zwiftId={zwiftId}
              key={result.id}
            />
          ))}
      </tbody>
    </table>
  );
}

export default TableLeadersInIntervals;
