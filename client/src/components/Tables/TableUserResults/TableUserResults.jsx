import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import { tdHeartRate, tdTime, tdWatts, tdWeight } from '../utils/td';
import TdCpWatts from '../Td/TdCpWatts';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import CategoryBox from '../../CategoryBox/CategoryBox';
import { getTimerLocal } from '../../../utils/date-local';
import TdRank from '../Td/TdRank';

import styles from '../Table.module.css';

import Thead from './Thead';
import { getCaption } from './utils';

const cx = classnames.bind(styles);

function TableUserResults({ results }) {
  const columnsCP = useSelector((state) => state.columnsCP.value);

  return (
    <table className={styles.table}>
      <caption className={cx('caption', 'hidden')}>{getCaption(results[0])}</caption>
      <Thead columnsCP={columnsCP} />
      <tbody>
        {results?.map((result) => (
          <tr className={styles.hover} key={result._id}>
            <td className={styles.center}>
              <TdRank value={result.rankEvent} dsq={result.disqualification} />
            </td>

            <td>
              <CategoryBox showLabel={true} label={result.subgroupLabel} circle={true} />
            </td>

            <td>{getTimerLocal(result.eventStart, 'DDMMYY')}</td>
            <td>
              <Link className={cx('link', 'name')} to={`/race/results/${result.eventId}`}>
                <span className={styles.big}>{result.eventName}</span>
              </Link>
            </td>
            <td>{tdTime(result.activityData.durationInMilliseconds.addition)}</td>

            <TdWattsPerKg
              valueRaw={result.wattsPerKg.value}
              valueAddition={result.wattsPerKg.addition}
            />

            <td>{tdWatts(result.sensorData.avgWatts.addition)}</td>

            {columnsCP.map((column) => {
              if (column.isVisible) {
                return (
                  <TdCpWatts
                    cpBestEfforts={result.cpBestEfforts}
                    interval={column.interval}
                    key={column.id}
                  />
                );
              }
              return null;
            })}
            <td>{tdHeartRate(result.sensorData.heartRateData.avgHeartRate.addition)}</td>
            <td>{tdWeight(result.profileData.weightInGrams.addition)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableUserResults;
