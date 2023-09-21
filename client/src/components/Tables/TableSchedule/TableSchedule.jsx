import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import styles from '../Table.module.css';

import { getToday } from '../../../utils/date-local';
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
import TdSeries from '../Td/TdSeries';
import TdScheduleMenuTableScheduleList from '../Td/TdScheduleMenuTableScheduleList';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableSchedule({ events, updateEvent, removeEvent }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);

  const isModerator = ['admin', 'moderator'].includes(role);

  return (
    <table className={cx('table', 'table_striped')}>
      <caption className={cx('caption', 'hidden')}>
        Расписание заездов российского сообщества в Zwift (Звифт)
      </caption>
      <Thead isModerator={isModerator} />
      <tbody>
        {events.map((event) => (
          <tr className={cx('hover')} key={event._id}>
            <td className={cx('td__nowrap')}>{getToday(event.eventStart)}</td>
            <TdSeries seriesName={event.seriesId?.name} />
            <td className={cx('td__nowrap')}>
              <Link className={cx('link')} to={String(event.id)}>
                <span className={cx('big')}>{event.name}</span>
              </Link>
            </td>
            <td className={cx('td__nowrap')}>{organizer(event.organizer)}</td>
            <TdRaceType typeRaceCustom={event.typeRaceCustom} />
            <td>
              <CategoriesBox event={event} addCls={'nowrap'} />
            </td>
            <td>{map(event.eventSubgroups[0]?.mapId)}</td>
            <td className={cx('td__nowrap')}>{route(event.eventSubgroups[0]?.routeId)}</td>
            <td>{getLaps(event.eventSubgroups[0]?.laps)}</td>
            <td>{getDistanceForTd(event.eventSubgroups[0])}</td>
            <td>{getElevationForTd(event.eventSubgroups[0])}</td>
            <td>{getDuration(event.eventSubgroups[0]?.durationInSeconds)}</td>
            {isModerator && (
              <TdScheduleMenuTableScheduleList
                event={event}
                updateEvent={updateEvent}
                removeEvent={removeEvent}
              />
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSchedule;
