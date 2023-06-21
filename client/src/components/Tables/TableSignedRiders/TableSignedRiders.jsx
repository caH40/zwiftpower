import React from 'react';

import { tdHeight, tdLinkZP, tdWeight } from '../utils/td';
import { getAgeCategory, getGenderStr } from '../../../utils/event';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';
import useLeader from '../../../hook/useLeaders';
import TdRider from '../Td/TdRider';
import TdCpWattsSchedule from '../Td/TdCpWattsSchedule';

import styles from '../Table.module.css';

import Thead from './Thead';

function TableSignedRiders({ riders = [], event }) {
  const { isScreenLg: lg, isScreenSm: sm } = useResize();
  const [getLeaders, getSweepers] = useLeader(event);
  // console.log(riders);
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
            {sm && (
              <TdCpWattsSchedule
                cp={rider.powerCurve?.pointsWattsPerKg}
                duration={15}
                dimension={'вт/кг'}
              />
            )}
            {sm && (
              <TdCpWattsSchedule
                cp={rider.powerCurve?.pointsWattsPerKg}
                duration={300}
                dimension={'вт/кг'}
              />
            )}
            <TdCpWattsSchedule
              cp={rider.powerCurve?.pointsWattsPerKg}
              duration={1200}
              dimension={'вт/кг'}
            />
            {lg && <td>{tdWeight(rider.weight)}</td>}
            {lg && <td>{tdHeight(rider.height / 10)}</td>}
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
