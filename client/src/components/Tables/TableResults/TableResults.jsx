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

import { resultsColumns } from './column-titles';

function TableResults({ events, updateResults, removeEvent, updateEventAndSinged }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);

  const isModerator = ['admin', 'moderator'].includes(role);

  return (
    <table className={`${styles.table} ${styles.table_striped}`}>
      <thead>
        <tr>
          {resultsColumns.map((column) => (
            <th key={column.id}>{column.name}</th>
          ))}
          <th>Прод.</th>
          {isModerator ? <th></th> : null}
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event._id}>
            <td>{getToday(event.eventStart)}</td>
            {/* <td>{getLocalDate(event.eventStart, ['short', 'onlyDate'])}</td> */}
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
            <td>{getLaps(event.eventSubgroups[0]?.laps)}</td>
            <td>{getDistanceForTd(event.eventSubgroups[0])}</td>
            <td>{getElevationForTd(event.eventSubgroups[0])}</td>
            <td>{getDuration(event.eventSubgroups[0]?.durationInSeconds)}</td>
            {isModerator ? (
              <td>
                <div className={styles.box__icons}>
                  <IconRefresh
                    getClick={() => updateResults(event.id)}
                    toolTip={'Обновление результатов заезда (протокола)'}
                    addCls={'pointer'}
                  />
                  <IconDelete
                    getClick={() => removeEvent(event.id, event.name)}
                    toolTip={'Удаление заезда и результатов заезда из БД'}
                    addCls={'pointer'}
                  />
                  <IconRefresh
                    getClick={() => updateEventAndSinged(event.id)}
                    toolTip={
                      'Обновление данных заезда и зарегистрированных райдеров. Исправляет отсутствие флагов у некоторых райдеров в протоколе. После данного обновления необходимо запустить обновление результатов'
                    }
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

export default TableResults;
