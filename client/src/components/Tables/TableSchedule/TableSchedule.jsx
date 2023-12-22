import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import styles from '../Table.module.css';

import { getToday } from '../../../utils/date-local';
import { getDuration, getLaps, map, organizer, routeName } from '../../../utils/event';
import { resetEventsSchedule } from '../../../redux/features/api/eventsSlice';
import CategoriesBox from '../../CategoriesBox/CategoriesBox';
import TdRaceType from '../Td/TdRaceType';
import TdSeries from '../Td/TdSeries';
import TdScheduleMenuTableScheduleList from '../Td/TdScheduleMenuTableScheduleList';
import RulesBox from '../../RulesBox/RulesBox';
import TdDistance from '../Td/TdDistance';
import TdElevation from '../Td/TdElevation';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableSchedule({ events, updateEvent, removeEvent }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);

  const isModerator = ['admin', 'moderator'].includes(role);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(resetEventsSchedule());
  }, []);

  return (
    <table className={cx('table')}>
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
            <td>
              <RulesBox event={event} squareSize={16} />
            </td>
            <td>{map(event.eventSubgroups[0]?.mapId)}</td>
            <td className={cx('td__nowrap')}>{routeName(event.eventSubgroups[0]?.routeId)}</td>
            <td>{getLaps(event.eventSubgroups[0]?.laps)}</td>
            {TdDistance(
              event.eventSubgroups[0].durationInSeconds,
              event.eventSubgroups[0].distanceInMeters,
              event.eventSubgroups[0].distanceSummary.distanceInKilometers
            )}
            {TdElevation(
              event.eventSubgroups[0].durationInSeconds,
              event.eventSubgroups[0].distanceInMeters,
              event.eventSubgroups[0].distanceSummary.elevationGainInMeters
            )}
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
