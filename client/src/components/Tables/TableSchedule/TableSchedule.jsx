import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import styles from '../Table.module.css';

import { useUserRole } from '../../../hook/useUserRole';
import { getToday } from '../../../utils/date-local';
import { getDuration, getLaps, getMapName, getRouteName } from '../../../utils/event';
import { resetEventsSchedule } from '../../../redux/features/api/eventsSlice';
import CategoriesBox from '../../CategoriesBox/CategoriesBox';
import TdSeries from '../Td/TdSeries';
import TdScheduleMenuTableScheduleList from '../Td/TdScheduleMenuTableScheduleList';
import RulesBox from '../../RulesBox/RulesBox';
import TdDistance from '../Td/TdDistance';
import TdElevation from '../Td/TdElevation';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableSchedule({ events, updateEvent, removeEvent }) {
  const { moderator } = useSelector((state) => state.checkAuth.value.user);
  const { isClubModerator, isAdmin, role } = useUserRole();

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(resetEventsSchedule());
  }, []);

  return (
    <table className={cx('table')}>
      <caption className={cx('caption', 'hidden')}>
        Расписание заездов российского сообщества в Zwift (Звифт)
      </caption>
      <Thead isModerator={isClubModerator || isAdmin} />
      <tbody>
        {events.map((event) => {
          // Проверка что текущий Эвент создан в клубе, который может модерировать пользователь.
          const isAllowedModerate = moderator?.clubs.includes(
            event.microserviceExternalResourceId
          );

          return (
            <tr className={cx('hover')} key={event._id}>
              <td className={cx('td__nowrap')}>{getToday(event.eventStart)}</td>

              <TdSeries
                seriesName={event.seriesId?.name}
                logoFileInfo={event.seriesId?.logoFileInfo}
              />

              <td className={cx('td__name')}>
                <Link className={cx('link')} to={String(event.id)}>
                  <span className={cx('big')}>{event.name}</span>
                </Link>
              </td>

              <td className={cx('td__nowrap')}>{event.organizer}</td>

              {/* <TdRaceType typeRaceCustom={event.typeRaceCustom} /> */}

              <td>
                <CategoriesBox event={event} addCls={'nowrap'} />
              </td>

              <td>
                <RulesBox event={event} squareSize={16} addCls={'nowrap'} />
              </td>

              <td>{getMapName(event.eventSubgroups[0]?.mapId)}</td>

              <td className={cx('min__w_150')}>
                {getRouteName(event.eventSubgroups[0]?.routeId)}
              </td>

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

              {isAllowedModerate || isAdmin ? (
                <TdScheduleMenuTableScheduleList
                  event={event}
                  updateEvent={updateEvent}
                  removeEvent={removeEvent}
                />
              ) : (
                (isClubModerator || isAdmin) && <td></td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableSchedule;
