import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { tdHeartRate, tdRank, tdTime, tdWatts, tdWattsPerKg, tdWeight } from '../utils/td';
import TdCpWatts from '../Td/TdCpWatts';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';
import Th from '../Th/Th';
import { getLocalDate } from '../../../utils/date-convert';

import styles from '../Table.module.css';

import { raceResultsColumns, raceResultsColumnsEnd } from './column-titles';

function TableUserResults({ results }) {
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { isScreenLg: lg, isScreenSm: sm } = useResize();

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <thead>
        <tr>
          {raceResultsColumns(lg, sm).map((column) => (
            <Th key={column.id} columnName={column.name} />
          ))}
          {lg &&
            columnsCP.map((column) => {
              if (column.isVisible) {
                return <th key={column.id}>{column.name}</th>;
              }
              return null;
            })}
          {lg &&
            raceResultsColumnsEnd.map((column) => (
              <Th key={column.id} columnName={column.name} />
            ))}
        </tr>
      </thead>
      <tbody>
        {results?.map((result) => (
          <tr key={result._id}>
            <td>{result.rankEvent}</td>

            <td>
              <CategoryBox showLabel={true} label={result.subgroupLabel} circle={true} />
            </td>
            {sm && <td>{tdRank(result.rankEvent)}</td>}
            <td>{getLocalDate(result.eventStart, 'onlyDate')}</td>
            <td>
              <Link className={styles.link} to={`/race/results/${result.eventId}`}>
                <span className={styles.big}>{result.eventName}</span>
              </Link>
            </td>
            <td>{tdTime(result.activityData.durationInMilliseconds.addition)}</td>
            {sm && <td>{tdWattsPerKg(result.wattsPerKg.addition)}</td>}
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
