import React from 'react';

import {
  tdCPWattsPerKg,
  tdHeartRate,
  tdHeight,
  tdRank,
  tdRider,
  tdTime,
  tdWatts,
  tdWattsPerKg,
  tdWeight,
} from '../utils/td';

import styles from '../Table.module.css';
import { tdGap } from '../utils/td';

import { getAgeCategory } from '../../../utils/event';

function TableRaceResults({ results }) {
  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <thead>
        <tr>
          <th>#</th>
          <th>Кат</th>
          <th></th>
          <th>Райдер</th>
          <th>Время</th>
          <th>Отс.</th>
          <th>Отс.пр.</th>
          <th>Сред.</th>
          <th></th>
          <th>5с</th>
          {/* <th>15с</th> */}
          <th>30с</th>
          <th>1м</th>
          <th>5м</th>
          <th>12м</th>
          <th>20м</th>
          <th>40м</th>
          <th>Пульс</th>
          <th>Вес</th>
          <th>Рост</th>
          <th>Возр.</th>
        </tr>
      </thead>
      <tbody>
        {results?.map((result, index) => (
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
            <td>{tdCPWattsPerKg(result.cpBestEfforts, 5)}</td>
            {/* <td>{tdCPWattsPerKg(result.cpBestEfforts, 15)}</td> */}
            <td>{tdCPWattsPerKg(result.cpBestEfforts, 30)}</td>
            <td>{tdCPWattsPerKg(result.cpBestEfforts, 60)}</td>
            <td>{tdCPWattsPerKg(result.cpBestEfforts, 300)}</td>
            <td>{tdCPWattsPerKg(result.cpBestEfforts, 720)}</td>
            <td>{tdCPWattsPerKg(result.cpBestEfforts, 1200)}</td>
            <td>{tdCPWattsPerKg(result.cpBestEfforts, 2400)}</td>
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
