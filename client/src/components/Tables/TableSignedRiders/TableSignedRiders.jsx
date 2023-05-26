import React from 'react';
import { Link } from 'react-router-dom';

import { tdLinkZP, tdRider } from '../utils/td';
import { getAgeCategory, getGenderStr, getHeightStr, getWeightStr } from '../../../utils/event';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';

import styles from '../Table.module.css';

import Thead from './Thead';

function TableSignedRiders({ riders = [] }) {
  const { isScreenLg: lg, isScreenSm: sm } = useResize();
  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <Thead lg={lg} sm={sm} />
      <tbody>
        {riders.map((rider, index) => (
          <tr key={rider._id}>
            <td>{index + 1}</td>
            <td>
              <CategoryBox showLabel={true} label={rider.subgroupLabel} circle={true} />
            </td>
            <td>
              <Link className={styles.link} to={`/profile/${rider.id}/results`}>
                {tdRider(
                  rider.firstName,
                  rider.lastName,
                  rider.imageSrc,
                  rider.countryAlpha3,
                  sm
                )}
              </Link>
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
