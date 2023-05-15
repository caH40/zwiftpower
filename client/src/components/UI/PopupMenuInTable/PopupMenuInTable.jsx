import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeScheduleMenu } from '../../../redux/features/popupTableScheduleSlice';
import IconRefresh from '../../icons/IconRefresh';
import IconDelete from '../../icons/IconDelete';

import styles from './PopupMenuInTable.module.css';

function PopupMenuInTable({ event, updateEvent, removeEvent }) {
  const { menus } = useSelector((state) => state.popupTableSchedule);
  const dispatch = useDispatch();

  const menu = menus.find((elm) => elm.eventId === event?.id) || {};

  const clickButton = (e) => {
    e.stopPropagation();
    dispatch(closeScheduleMenu(event?.id));
    updateEvent(event.id);
  };

  return (
    <>
      {menu?.isVisible && (
        <div
          className={styles.popup}
          // onClick={() => dispatch(closeScheduleMenu(event?.id))}
          onMouseLeave={() => dispatch(closeScheduleMenu(event?.id))}
        >
          <ul className={styles.list}>
            <li className={styles.item} onClick={clickButton}>
              <IconRefresh />
              <span className={styles.label}>Обновление данных заезда</span>
            </li>

            <li className={styles.item} onClick={() => removeEvent(event.id, event.name)}>
              <IconDelete />
              <span className={styles.label}>Удаление заезда из БД</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default PopupMenuInTable;
