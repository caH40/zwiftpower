import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from '../Table.module.css';

import { getLocalDate } from '../../../utils/date-convert';
import { map, organizer, raceType, route } from '../../../utils/event';
import IconRefresh from '../../icons/IconRefresh';
import IconDelete from '../../icons/IconDelete';

function TableResults({ events, updateEvent, removeEvent }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);

  const isModerator = ['admin', 'moderator'].includes(role);

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Название</th>
          <th>Организатор</th>
          <th>Тип заезда</th>
          <th>Финишировало</th>
          <th>Карта</th>
          <th>Маршрут</th>
          <th>Круги</th>
          {isModerator ? <th></th> : null}
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event._id}>
            <td>{getLocalDate(event.eventStart, ['short', 'onlyDate'])}</td>
            <td>
              <Link className={styles.link} to={String(event.id)}>
                <span className={styles.big}>{event.name}</span>
              </Link>
            </td>
            <td>{organizer(event.organizer)}</td>
            <td>{raceType(event.typeRaceCustom)}</td>
            <td>{event.totalFinishedCount}</td>
            <td>{map(event.eventSubgroups[0]?.mapId)}</td>
            <td>{route(event.eventSubgroups[0]?.routeId)}</td>
            <td>{event.eventSubgroups[0]?.laps}</td>
            {isModerator ? (
              <td>
                <div className={styles.box__icons}>
                  <IconRefresh
                    getClick={() => updateEvent(event.id)}
                    toolTip={'Обновление результатов заезда'}
                  />
                  <IconDelete
                    getClick={() => removeEvent(event.id, event.name)}
                    toolTip={'Удаление заезда и результатов заезда из БД'}
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

export default TableResults;
