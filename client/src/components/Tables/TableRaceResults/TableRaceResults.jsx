import React from 'react';

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
          <th>Ср.мощ</th>
          <th>От.мощ</th>
          <th>5s</th>
          <th>15s</th>
          <th>30s</th>
          <th>1m</th>
          <th>5m</th>
          <th>12m</th>
          <th>20m</th>
          <th>40m</th>
          <th>Пульс</th>
          <th>Вес</th>
          <th>Рост</th>
          <th>Вз.кат.</th>
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
            <td>{result.cpBestEfforts.find((cp) => cp.duration === 5)?.wattsKg}</td>
            <td>{result.cpBestEfforts.find((cp) => cp.duration === 15)?.wattsKg}</td>
            <td>{result.cpBestEfforts.find((cp) => cp.duration === 30)?.wattsKg}</td>
            <td>{result.cpBestEfforts.find((cp) => cp.duration === 60)?.wattsKg}</td>
            <td>{result.cpBestEfforts.find((cp) => cp.duration === 300)?.wattsKg}</td>
            <td>{result.cpBestEfforts.find((cp) => cp.duration === 720)?.wattsKg}</td>
            <td>{result.cpBestEfforts.find((cp) => cp.duration === 1200)?.wattsKg}</td>
            <td>{result.cpBestEfforts.find((cp) => cp.duration === 2400)?.wattsKg}</td>
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
