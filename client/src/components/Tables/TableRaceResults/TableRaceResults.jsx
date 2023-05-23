import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  tdHeartRate,
  tdHeight,
  tdRank,
  tdRider,
  tdTime,
  tdWatts,
  tdWattsPerKg,
  tdWeight,
} from '../utils/td';
import { tdGap } from '../utils/td';
import TdCpWatts from '../Td/TdCpWatts';
import { getAgeCategory } from '../../../utils/event';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';
import Th from '../Th/Th';

import styles from '../Table.module.css';

import { raceResultsColumns, raceResultsColumnsEnd } from './column-titles';

function TableRaceResults({ results }) {
  const filterCategory = useSelector((state) => state.filterCategory.value);
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { isScreenLg: lg, isScreenSm: sm } = useResize();

  const resultFiltered = useMemo(() => {
    if (filterCategory.name === 'All') return results;
    return [...results].filter((result) => result.subgroupLabel === filterCategory.name);
  }, [filterCategory, results]);

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
        {resultFiltered?.map((result, index) => (
          <tr key={result._id}>
            <td>{tdRank(result.rankEvent)}</td>
            {sm && (
              <td>
                <CategoryBox showLabel={true} label={result.subgroupLabel} circle={true} />
              </td>
            )}

            <td>
              <Link className={styles.link} to={`/profile/${result.profileId}/results`}>
                {tdRider(
                  result.profileData.firstName,
                  result.profileData.lastName,
                  result.profileData.imageSrc,
                  result.profileData.countryAlpha3,
                  sm
                )}
              </Link>
            </td>

            <td>{tdTime(result.activityData.durationInMilliseconds.addition)}</td>
            {lg && <td>{tdGap(result.gap)}</td>}
            {lg && <td>{tdGap(result.gapPrev)}</td>}
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
                <td>{tdHeight(result.profileData.heightInCentimeters.addition)}</td>
                <td>{getAgeCategory(result.profileData.age)}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableRaceResults;
