import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from '../Table.module.css';

import { getTimerLocal } from '../../../utils/date-local';
import {
  getDuration,
  getLaps,
  map,
  organizer,
  route,
  getDistanceForTd,
  getElevationForTd,
} from '../../../utils/event';
import TdScheduleMenuTableResultList from '../Td/TdScheduleMenuTableResultList';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRaceType from '../Td/TdRaceType';
import TdSeries from '../Td/TdSeries';
import { useResize } from '../../../hook/use-resize';

import Thead from './Thead';

function TableResults({ events, updateResults, removeEvent, updateEventAndSinged }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const { isScreenLg: lg, isScreenSm: sm, isScreenMd: md } = useResize();

  const isModerator = ['admin', 'moderator'].includes(role);
  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <Thead lg={lg} md={md} sm={sm} isModerator={isModerator} />
      <tbody>
        {events.map((event) => (
          <tr key={event._id}>
            <td>{getTimerLocal(event.eventStart, 'DDMMYY')}</td>
            {md && <TdSeries seriesName={event.seriesId?.name} />}
            <td>
              <Link className={styles.link} to={String(event.id)}>
                <span className={styles.big}>{event.name}</span>
              </Link>
            </td>

            {md && <td>{organizer(event.organizer)}</td>}
            {md && <TdRaceType typeRaceCustom={event.typeRaceCustom} />}
            <td>
              <CategoryBox label="T" quantityRiders={event.totalFinishedCount} />
            </td>
            {sm && <td>{map(event.eventSubgroups[0]?.mapId)}</td>}
            {sm && <td>{route(event.eventSubgroups[0]?.routeId)}</td>}
            {md && (
              <>
                <td>{getLaps(event.eventSubgroups[0]?.laps)}</td>
                <td>{getDistanceForTd(event.eventSubgroups[0])}</td>
                <td>{getElevationForTd(event.eventSubgroups[0])}</td>
              </>
            )}
            {lg && <td>{getDuration(event.eventSubgroups[0]?.durationInSeconds)}</td>}
            {isModerator && (
              <TdScheduleMenuTableResultList
                event={event}
                updateResults={updateResults}
                updateEventAndSinged={updateEventAndSinged}
                removeEvent={removeEvent}
              />
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableResults;
