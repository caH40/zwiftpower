import React from 'react';

import { tdLinkZP, tdRider } from '../utils/td';

import styles from '../Table.module.css';
import { getAgeCategory, getGenderStr, getHeightStr, getWeightStr } from '../../../utils/event';

function TableSignedRiders({ riders = [] }) {
  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <thead>
        <tr>
          <th>#</th>
          <th>Кат</th>
          <th>Райдер</th>
          <th>Команда</th>
          <th>Вес</th>
          <th>Рост</th>
          <th>Вз.кат.</th>
          <th>Пол</th>
          <th>zp.com</th>
        </tr>
      </thead>
      <tbody>
        {riders.map((rider, index) => (
          <tr key={rider._id}>
            <td>{index + 1}</td>
            <td>
              <span className={`${styles.category} ${styles[rider.subgroupLabel]}`}>
                {rider.subgroupLabel}
              </span>
            </td>
            <td>
              {tdRider(rider.firstName, rider.lastName, rider.imageSrc, rider.countryAlpha3)}
            </td>
            <td></td>
            <td>{getWeightStr(rider.weight)}</td>
            <td>{getHeightStr(rider.height)}</td>
            <td>{getAgeCategory(rider.age)}</td>
            <td>{getGenderStr(rider.male)}</td>
            <td className={styles.link}>{tdLinkZP(rider.id)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSignedRiders;
