import React from 'react';

import { tdLinkZP, tdRider } from '../utils/td';
import { getAgeCategory, getGenderStr, getHeightStr, getWeightStr } from '../../../utils/event';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';

import styles from '../Table.module.css';

import { signedRidersColumns } from './column-titles';

function TableSignedRiders({ riders = [] }) {
  const { isScreenLg: lg, isScreenSm: sm } = useResize();
  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <thead>
        <tr>
          {signedRidersColumns(lg, sm).map((column) => (
            <th key={column.id}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {riders.map((rider, index) => (
          <tr key={rider._id}>
            <td>{index + 1}</td>
            <td>
              <CategoryBox label={rider.subgroupLabel} circle={true} />
            </td>
            <td>
              {tdRider(
                rider.firstName,
                rider.lastName,
                rider.imageSrc,
                rider.countryAlpha3,
                sm
              )}
            </td>
            {lg && <td></td>}
            {sm && <td>{getWeightStr(rider.weight)}</td>}
            {sm && <td>{getHeightStr(rider.height)}</td>}
            {lg && <td>{getAgeCategory(rider.age)}</td>}
            {lg && <td>{getGenderStr(rider.male)}</td>}
            {lg && <td className={styles.link}>{tdLinkZP(rider.id)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSignedRiders;
