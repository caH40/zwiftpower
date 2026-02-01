import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classnames from 'classnames/bind';

import { useRaceRoute } from '../../../hook/useRaceRoute';
import { resetEventsResults } from '../../../redux/features/api/eventsSlice';
import { getTimerLocal } from '../../../utils/date-local';
import { getDuration, getLaps, getMapName } from '../../../utils/event';
import TdScheduleMenuTableResultList from '../Td/TdScheduleMenuTableResultList';
import CategoryBox from '../../CategoryBox/CategoryBox';
import { useUserRole } from '../../../hook/useUserRole';
import TdSeries from '../Td/TdSeries';
import TdDistance from '../Td/TdDistance';
import TdElevation from '../Td/TdElevation';
import SimpleLogo from '../../SimpleLogo/SimpleLogo';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableResults({ events, updateResults, removeEvent, updateEventAndSinged }) {
  const { isClubModerator, isAdmin, hasAuth } = useUserRole();
  const dispatch = useDispatch();

  const routeIds = useMemo(() => {
    return [...new Set(events.map(({ eventSubgroups }) => eventSubgroups[0]?.routeId))];
  }, [events]);

  const routes = useRaceRoute(routeIds);

  useEffect(() => {
    return () => dispatch(resetEventsResults());
  }, [dispatch]);

  return (
    <table className={cx('table')}>
      <caption className={cx('caption', 'hidden')}>
        Результаты заездов российского сообщества в Zwift (Звифт)
      </caption>
      <Thead hasAuth={hasAuth} isModerator={isClubModerator || isAdmin} />
      <tbody>
        {events.map(({ organizerId, ...event }) => {
          // Проверка что текущий Эвент создан в клубе, который может модерировать пользователь.
          // const isAllowedModerate = moderator?.clubs.includes(
          //   event.microserviceExternalResourceId
          // );
          return (
            <tr className={cx('hover')} key={event._id}>
              <td>{getTimerLocal(event.eventStart, 'DDMMYY')}</td>

              <TdSeries
                seriesName={event.seriesId?.name}
                logoFileInfo={event.seriesId?.logoFileInfo}
              />

              <td className={cx('td__name')}>
                <Link className={cx('link')} to={String(event.id)}>
                  <span className={cx('big')}>{event.name}</span>
                </Link>
              </td>

              <td>
                {organizerId ? (
                  <Link
                    to={`/organizers/${organizerId.urlSlug}/schedule`}
                    style={{ minWidth: 40 }}
                  >
                    <SimpleLogo
                      squareSize={28}
                      name={organizerId.name}
                      sources={organizerId.logoUrls}
                    />
                  </Link>
                ) : null}
              </td>

              <td>
                <CategoryBox label="T" quantityRiders={event.totalFinishedCount} />
              </td>
              <td>{getMapName(event.eventSubgroups[0]?.mapId)}</td>
              <td className={cx('min__w_150')}>
                {routes[event.eventSubgroups[0]?.routeId]?.name}
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

              {hasAuth ? (
                <TdScheduleMenuTableResultList
                  event={event}
                  updateResults={updateResults}
                  updateEventAndSinged={updateEventAndSinged}
                  removeEvent={removeEvent}
                />
              ) : (
                hasAuth && <td></td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableResults;
