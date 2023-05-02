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
  raceType,
  route,
  getDistanceForTd,
  getElevationForTd,
} from '../../../utils/event';
import IconRefresh from '../../icons/IconRefresh';
import IconDelete from '../../icons/IconDelete';

function TableSchedule({ events, updateEvent, removeEvent }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);

  const isModerator = ['admin', 'moderator'].includes(role);

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <thead>
        <tr>
          <th>Дата старта</th>
          <th>Название</th>
          <th>Организатор</th>
          <th>Тип заезда</th>
          <th>Регистрация</th>
          <th>Карта</th>
          <th>Маршрут</th>
          <th>Круги</th>
          <th>Расстояние</th>
          <th>Подъем</th>
          <th>Прод.</th>
          {isModerator ? <th></th> : null}
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event._id}>
            <td>{getToday(event.eventStart)}</td>
            <td>
              <Link className={styles.link} to={String(event.id)}>
                <span className={styles.big}>{event.name}</span>
              </Link>
            </td>
            <td>{organizer(event.organizer)}</td>
            <td>{raceType(event.typeRaceCustom)}</td>
            <td>{event.totalEntrantCount}</td>
            <td>{map(event.eventSubgroups[0]?.mapId)}</td>
            <td>{route(event.eventSubgroups[0]?.routeId)}</td>
            <td>{getLaps(event.eventSubgroups[0]?.laps)}</td>
            <td>{getDistanceForTd(event.eventSubgroups[0])}</td>
            <td>{getElevationForTd(event.eventSubgroups[0])}</td>
            <td>{getDuration(event.eventSubgroups[0]?.durationInSeconds)}</td>
            {isModerator ? (
              <td>
                <div className={styles.box__icons}>
                  <IconRefresh
                    getClick={() => updateEvent(event.id)}
                    toolTip={'Обновление данных заезда'}
                    addCls={'pointer'}
                  />
                  <IconDelete
                    getClick={() => removeEvent(event.id, event.name)}
                    toolTip={'Удаление из БД заезда'}
                    addCls={'pointer'}
                  />
                </div>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSchedule;
