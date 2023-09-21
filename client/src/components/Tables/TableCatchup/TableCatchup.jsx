import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import styles from '../Table.module.css';

import { secondesToTime } from '../../../utils/date-convert';
import { getTimerLocal } from '../../../utils/date-local';
import { useResize } from '../../../hook/use-resize';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import { getDistanceForTd, getElevationForTd, getLaps, map, route } from '../../../utils/event';

import Thead from './Thead';

function TableCatchup({ catchups }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const { isScreenMd: md, isScreenSm: sm } = useResize();

  const isModerator = ['admin', 'moderator'].includes(role);

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <caption className={styles.caption}>Победители этапов</caption>
      <Thead md={md} sm={sm} isModerator={isModerator} />
      <tbody>
        {catchups.map((catchupResult) => (
          <tr key={catchupResult.eventId}>
            <td>{getTimerLocal(catchupResult.eventStart, 'DDMMYY')}</td>
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
            {md && <td>{map(catchupResult.eventSubgroup.mapId)}</td>}
            {md && <td>{route(catchupResult.eventSubgroup.routeId)}</td>}
            {md && <td>{getLaps(catchupResult.eventSubgroup.laps)}</td>}
            {md && <td>{getDistanceForTd(catchupResult.eventSubgroup)}</td>}
            {md && <td>{getElevationForTd(catchupResult.eventSubgroup)}</td>}
            <td>
              <Link className={styles.link} to={`/race/results/${catchupResult.eventId}`}>
                этап
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableCatchup;
