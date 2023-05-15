import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeScheduleMenu } from '../../../redux/features/popupTableScheduleSlice';
import IconRefresh from '../../icons/IconRefresh';
import IconDelete from '../../icons/IconDelete';

import styles from './PopupMenuTable.module.css';

function PopupMenuTableScheduleList({ event, updateEvent, removeEvent }) {
  const { menus } = useSelector((state) => state.popupTableSchedule);
  const dispatch = useDispatch();

  const menu = menus.find((elm) => elm.eventId === event?.id) || {};

  const clickUpdateEvent = (e) => {
    e.stopPropagation();
    dispatch(closeScheduleMenu(event?.id));
    updateEvent(event.id);
  };

  const clickButton = (e) => {
    e.stopPropagation();
    dispatch(closeScheduleMenu(event?.id));
    removeEvent(event.id, event.name);
  };

  return (
    <>
      {menu?.isVisible && (
        <div
          className={styles.popup}
          onMouseLeave={() => dispatch(closeScheduleMenu(event?.id))}
        >
          <ul className={styles.list}>
            <li className={styles.item} onClick={clickUpdateEvent}>
              <IconRefresh />
              <span className={styles.label}>Обновление данных заезда</span>
            </li>

            <li className={styles.item} onClick={clickButton}>
              <IconDelete />
              <span className={styles.label}>Удаление заезда из БД</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default PopupMenuTableScheduleList;
