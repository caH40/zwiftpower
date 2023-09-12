import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { tdHeartRate, tdTime, tdWatts, tdWeight } from '../utils/td';
import TdCpWatts from '../Td/TdCpWatts';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';
import { getTimerLocal } from '../../../utils/date-local';
import TdRank from '../Td/TdRank';

import styles from '../Table.module.css';

import Thead from './Thead';

function TableUserResults({ results }) {
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { isScreenMd: md, isScreenSm: sm } = useResize();

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <Thead md={md} sm={sm} columnsCP={columnsCP} />
      <tbody>
        {results?.map((result) => (
          <tr key={result._id}>
            <td className={styles.center}>
              <TdRank value={result.rankEvent} dsq={result.disqualification} />
            </td>
            {sm && (
              <td>
                <CategoryBox showLabel={true} label={result.subgroupLabel} circle={true} />
              </td>
            )}

            <td>{getTimerLocal(result.eventStart, 'DDMMYY')}</td>
            <td>
              <Link
                className={cn(styles.link, styles.name)}
                to={`/race/results/${result.eventId}`}
              >
                <span className={styles.big}>{result.eventName}</span>
              </Link>
            </td>
            <td>{tdTime(result.activityData.durationInMilliseconds.addition)}</td>
            {sm && (
              <TdWattsPerKg
                valueRaw={result.wattsPerKg.value}
                valueAddition={result.wattsPerKg.addition}
              />
            )}
            {sm && <td>{tdWatts(result.sensorData.avgWatts.addition)}</td>}

            {md &&
              columnsCP.map((column) => {
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
            {md && (
              <>
                <td>{tdHeartRate(result.sensorData.heartRateData.avgHeartRate.addition)}</td>
                <td>{tdWeight(result.profileData.weightInGrams.addition)}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableUserResults;
