import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { tdHeartRate, tdRank, tdTime, tdWatts, tdWeight } from '../utils/td';
import TdCpWatts from '../Td/TdCpWatts';
import TdWattsPerKg from '../Td/TdWattsPerKg';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';
import { getLocalDate } from '../../../utils/date-convert';

import styles from '../Table.module.css';

import Thead from './Thead';

function TableUserResults({ results }) {
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { isScreenLg: lg, isScreenSm: sm } = useResize();

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <Thead lg={lg} sm={sm} columnsCP={columnsCP} />
      <tbody>
        {results?.map((result) => (
          <tr key={result._id}>
            <td className={styles.center}>{tdRank(result.rankEvent)}</td>
            {sm && (
              <td>
                <CategoryBox showLabel={true} label={result.subgroupLabel} circle={true} />
              </td>
            )}

            <td>{getLocalDate(result.eventStart, 'onlyDate')}</td>
            <td>
              <Link className={styles.link} to={`/race/results/${result.eventId}`}>
                <span className={styles.big}>{result.eventName}</span>
              </Link>
            </td>
            <td>{tdTime(result.activityData.durationInMilliseconds.addition)}</td>
            {sm && <TdWattsPerKg value={result.wattsPerKg.addition} />}
            {sm && <td>{tdWatts(result.sensorData.avgWatts.addition)}</td>}

            {lg &&
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
            {lg && (
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
