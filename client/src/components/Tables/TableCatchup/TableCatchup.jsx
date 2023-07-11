import React from 'react';

import { useSelector } from 'react-redux';

import styles from '../Table.module.css';

import { getLocalDate, secondesToTime } from '../../../utils/date-convert';

import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import { getDistanceForTd, getElevationForTd, getLaps, map, route } from '../../../utils/event';

import Thead from './Thead';

function TableCatchup({ catchups }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const { isScreenLg: lg, isScreenSm: sm } = useResize();

  const isModerator = ['admin', 'moderator'].includes(role);

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <Thead lg={lg} sm={sm} isModerator={isModerator} />
      <tbody>
        {catchups.map((catchupResult) => (
          <tr key={catchupResult._id}>
            <td>{getLocalDate(catchupResult.eventStart, 'onlyDate')}</td>
            <td>
              <CategoryBox showLabel={true} label={catchupResult.subgroupLabel} circle={true} />
            </td>
            <TdRider
              profileId={catchupResult.profileId}
              profile={catchupResult.profileData}
              showIcons={{ sm }}
            />
            {sm && <td>{secondesToTime(catchupResult.durationInMilliseconds)}</td>}
            {sm && <td>{catchupResult.totalFinishedCount}</td>}
            {lg && <td>{map(catchupResult.eventSubgroup.mapId)}</td>}
            {lg && <td>{route(catchupResult.eventSubgroup.routeId)}</td>}
            {lg && <td>{getLaps(catchupResult.eventSubgroup.laps)}</td>}
            {lg && <td>{getDistanceForTd(catchupResult.eventSubgroup)}</td>}
            {lg && <td>{getElevationForTd(catchupResult.eventSubgroup)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableCatchup;
