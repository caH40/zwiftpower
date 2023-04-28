import React from 'react';

import { tdRider } from '../utils/td';

import styles from '../Table.module.css';
import { getHeightStr, getWeightStr } from '../../../utils/event';
import { secondesToTime, secondesToTimeThousandths } from '../../../utils/date-convert';
import { tdGap } from '../utils/td';
import { filterThousandths } from '../../../utils/thousandths-seconds';

function TableRaceResults({ results }) {
  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <thead>
        <tr>
          <th>#</th>
          <th>Кат</th>
          <th>Райдер</th>
          <th>Команда</th>
          <th>Время</th>
          <th>Отс.</th>
          <th></th>
          <th>Ватт</th>
          <th>Ватт/кг</th>
          <th>Пульс</th>
          <th>Вес</th>
          <th>Рост</th>
        </tr>
      </thead>
      <tbody>
        {results?.map((result) => (
          <tr key={result._id}>
            <td>{result.rankEvent}</td>
            <td>
              <span className={`${styles.category} ${styles[result.subgroupLabel]}`}>
                {result.subgroupLabel}
              </span>
            </td>
            <td>
              {tdRider(
                `${result.profileData.firstName} ${result.profileData.lastName}`,
                result.profileData.imageSrc
              )}
            </td>
            <td></td>
            <td>{result.activityData.durationInMilliseconds.addition}</td>
            <td>{secondesToTime(result.gap)}</td>
            <td>{tdGap(result.gapPrev)}</td>

            <td>{result.sensorData.avgWatts.value}</td>
            <td>{result.wattsPerKg.value}</td>
            <td>{result.sensorData.heartRateData.avgHeartRate.value}</td>
            <td>{getWeightStr(result.profileData.weightInGrams.value)}</td>
            <td>{getHeightStr(result.profileData.heightInCentimeters.value, 'cm')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableRaceResults;
