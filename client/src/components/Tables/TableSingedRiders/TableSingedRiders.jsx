import React from 'react';

import { tdLinkZP, tdRider } from '../utils/td';

import styles from '../Table.module.css';
import { getAgeCategory, getGenderStr, getHeightStr, getWeightStr } from '../../../utils/event';
import Flag from '../../Flag/Flag';

function TableSingedRiders({ riders }) {
  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <thead>
        <tr>
          <th>#</th>
          <th>Кат</th>
          <th>Страна</th>
          <th>Райдер</th>
          <th>Команда</th>
          <th>Возраст</th>
          <th>Вес</th>
          <th>Рост</th>
          <th>Пол</th>
          <th>zwiftpower.com</th>
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
              <div className={styles.box__flag}>
                <Flag name={rider.countryAlpha3} />
              </div>
            </td>
            <td>{tdRider(`${rider.firstName} ${rider.lastName}`, rider.imageSrc)}</td>
            <td></td>
            <td>{getAgeCategory(rider.age)}</td>
            <td>{getWeightStr(rider.weight)}</td>
            <td>{getHeightStr(rider.height)}</td>
            <td>{getGenderStr(rider.male)}</td>
            <td className={styles.link}>{tdLinkZP(rider.id)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSingedRiders;
