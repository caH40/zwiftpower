import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { resetEventsResults } from '../../../redux/features/api/eventsSlice';
import { getTimerLocal } from '../../../utils/date-local';
import { getDuration, getLaps, map, routeName } from '../../../utils/event';
import TdScheduleMenuTableResultList from '../Td/TdScheduleMenuTableResultList';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRaceType from '../Td/TdRaceType';
import TdSeries from '../Td/TdSeries';
import TdDistance from '../Td/TdDistance';
import TdElevation from '../Td/TdElevation';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableResults({ events, updateResults, removeEvent, updateEventAndSinged }) {
  const { role, isModeratorClub, moderator } = useSelector(
    (state) => state.checkAuth.value.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(resetEventsResults());
  }, []);

  const isAdmin = ['admin'].includes(role);

  return (
    <table className={cx('table')}>
      <caption className={cx('caption', 'hidden')}>
        Результаты заездов российского сообщества в Zwift (Звифт)
      </caption>
      <Thead isModerator={isModeratorClub || isAdmin} />
      <tbody>
        {events.map((event) => {
          // Проверка что текущий Эвент создан в клубе, который может модерировать пользователь.
          const isAllowedModerate = moderator?.clubs.includes(
            event.microserviceExternalResourceId
          );
          return (
            <tr className={cx('hover')} key={event._id}>
              <td>{getTimerLocal(event.eventStart, 'DDMMYY')}</td>
              <TdSeries seriesName={event.seriesId?.name} />
              <td className={cx('td__nowrap')}>
                <Link className={cx('link')} to={String(event.id)}>
                  <span className={cx('big')}>{event.name}</span>
                </Link>
              </td>

              <td className={cx('td__nowrap')}>{event.organizer}</td>
              <TdRaceType typeRaceCustom={event.typeRaceCustom} />
              <td>
                <CategoryBox label="T" quantityRiders={event.totalFinishedCount} />
              </td>
              <td>{map(event.eventSubgroups[0]?.mapId)}</td>
              <td className={cx('td__nowrap')}>
                {routeName(event.eventSubgroups[0]?.routeId)}
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
                <TdScheduleMenuTableResultList
                  event={event}
                  updateResults={updateResults}
                  updateEventAndSinged={updateEventAndSinged}
                  removeEvent={removeEvent}
                />
              ) : (
                (isModeratorClub || isAdmin) && <td></td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableResults;
