import React from 'react';

import { tdLinkZP } from '../utils/td';
import { getAgeCategory, getGenderStr, getHeightStr, getWeightStr } from '../../../utils/event';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';
import useLeader from '../../../hook/useLeaders';
import TdRider from '../Td/TdRider';

import styles from '../Table.module.css';

import Thead from './Thead';

function TableSignedRiders({ riders = [], event }) {
  const { isScreenLg: lg, isScreenSm: sm } = useResize();
  const [getLeaders, getSweepers] = useLeader(event);

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
            <TdRider
              profile={{ ...rider, gender: rider.male ? 'MALE' : 'FEMALE' }}
              profileId={rider.id}
              showIcons={{ sm }}
              getLeaders={getLeaders}
              getSweepers={getSweepers}
            />

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
