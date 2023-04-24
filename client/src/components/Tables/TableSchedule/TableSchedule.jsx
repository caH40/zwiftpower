import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../Table.module.css';

import { getLocalDate } from '../../../utils/date-convert';
import { map, route } from '../../../utils/event';
import Button from '../../UI/Button/Button';
import { putSingedRiders } from '../../../api/zwift/riders';

function TableSchedule({ events }) {
  const updateSingedRiders = (eventId) => putSingedRiders(eventId);
  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <thead>
        <tr>
          <th>Дата старта</th>
          <th>Тип заезда</th>
          <th>Название</th>
          <th>Регистрация</th>
          <th>Карта</th>
          <th>Маршрут</th>
          <th>Круги</th>
          <th>edit</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event._id}>
            <td>{getLocalDate(event.eventStart, 'short')}</td>
            <td>{event.typeEventCustom}</td>
            <td>
              <Link className={styles.link} to={String(event.id)}>
                {event.name}
              </Link>
            </td>
            <td>{event.totalEntrantCount}</td>
            <td>{map(event.eventSubgroups[0]?.mapId)}</td>
            <td>{route(event.eventSubgroups[0]?.routeId)}</td>
            <td>{event.eventSubgroups[0]?.laps}</td>
            <td>
              <Button getClick={() => updateSingedRiders(event.id)}>update</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSchedule;
