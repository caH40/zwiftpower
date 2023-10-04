import { Fragment } from 'react';

import { getIntervalName } from '../../../utils/intervals';
import styles from '../Table.module.css';

import Thead from './Thead';
import TrBlock from './TrBlock';

const intervals = [15, 60, 300, 1200];

function TableLeadersInIntervals({ leadersInIntervals, type }) {
  return (
    <table className={styles.table}>
      <caption className={styles.hidden}>Лидеры по мощности за определенные интервалы</caption>
      <Thead type={type} />
      <tbody>
        {intervals.map((interval) => (
          <Fragment key={interval}>
            <tr>
              <td className={styles.td__interval} colSpan={5}>
                {getIntervalName(interval)}
              </td>
            </tr>
            {leadersInIntervals
              .filter((result) => result.interval === interval)
              .map((result, index) => (
                <TrBlock result={result} index={index} type={type} key={result.id} />
              ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default TableLeadersInIntervals;
