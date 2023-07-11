import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from '../Table.module.css';

import { getToday } from '../../../utils/date-convert';
import {
  getDuration,
  getLaps,
  map,
  organizer,
  route,
  getDistanceForTd,
  getElevationForTd,
} from '../../../utils/event';

import CategoriesBox from '../../CategoriesBox/CategoriesBox';
import TdRaceType from '../Td/TdRaceType';
import { useResize } from '../../../hook/use-resize';

import TdScheduleMenuTableScheduleList from '../Td/TdScheduleMenuTableScheduleList';

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
            <td>{getToday(catchupResult.eventStart)}</td>
            <td>
              <Link className={styles.link} to={String(catchupResult.id)}>
                <span className={styles.big}>{catchupResult.name}</span>
              </Link>
            </td>
            {lg && <td>{organizer(catchupResult.organizer)}</td>}
            {lg && <TdRaceType typeRaceCustom={catchupResult.typeRaceCustom} />}
            <td>
              <CategoriesBox event={catchupResult} />
            </td>
            {sm && <td>{map(catchupResult.eventSubgroups[0]?.mapId)}</td>}
            {sm && <td>{route(catchupResult.eventSubgroups[0]?.routeId)}</td>}
            {lg && <td>{getLaps(catchupResult.eventSubgroups[0]?.laps)}</td>}
            {lg && <td>{getDistanceForTd(catchupResult.eventSubgroups[0])}</td>}
            {lg && <td>{getElevationForTd(catchupResult.eventSubgroups[0])}</td>}
            {lg && <td>{getDuration(catchupResult.eventSubgroups[0]?.durationInSeconds)}</td>}
            {isModerator && (
              <TdScheduleMenuTableScheduleList
                event={catchupResult}
                updateEvent={catchupResult}
                removeEvent={catchupResult}
              />
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableCatchup;
