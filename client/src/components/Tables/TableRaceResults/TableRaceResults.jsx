import React, { useMemo } from 'react';
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
import styles from '../Table.module.css';

import { raceResultsColumnsEnd, raceResultsColumnsStart } from './column-titles';

function TableRaceResults({ results }) {
  const filterCategory = useSelector((state) => state.filterCategory.value);
  const columnsCP = useSelector((state) => state.columnsCP.value);

  const resultFiltered = useMemo(() => {
    if (filterCategory.name === 'All') return results;
    return [...results].filter((result) => result.subgroupLabel === filterCategory.name);
  }, [filterCategory, results]);

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <thead>
        <tr>
          {raceResultsColumnsStart.map((column) => (
            <th key={column.id}>{column.name}</th>
          ))}
          {columnsCP.map((column) => {
            if (column.isVisible) {
              return <th key={column.id}>{column.name}</th>;
            }
            return null;
          })}
          {raceResultsColumnsEnd.map((column) => (
            <th key={column.id}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {resultFiltered?.map((result, index) => (
          <tr key={result._id}>
            <td>{index + 1}</td>

            <td>
              <span className={`${styles.category} ${styles[result.subgroupLabel]}`}>
                {result.subgroupLabel}
              </span>
            </td>
            <td>{tdRank(result.rankEvent)}</td>
            <td>
              {tdRider(
                result.profileData.firstName,
                result.profileData.lastName,
                result.profileData.imageSrc,
                result.profileData.countryAlpha3
              )}
            </td>

            <td>{tdTime(result.activityData.durationInMilliseconds.addition)}</td>
            <td>{tdGap(result.gap)}</td>
            <td>{tdGap(result.gapPrev)}</td>
            <td>{tdWatts(result.sensorData.avgWatts.addition)}</td>
            <td>{tdWattsPerKg(result.wattsPerKg.addition)}</td>
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
            <td>{tdHeight(result.profileData.heightInCentimeters.addition)}</td>
            <td>{getAgeCategory(result.profileData.age)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableRaceResults;
