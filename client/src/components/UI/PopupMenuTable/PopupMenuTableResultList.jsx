// меню в таблице эвентов с результатами, модерирование каждого эвента
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeResultListMenu } from '../../../redux/features/popupTableResultsListSlice';
import { fetchResultsJson } from '../../../redux/features/api/downloadResultsSlice';
import IconRefresh from '../../icons/IconRefresh';
import IconDelete from '../../icons/IconDelete';
import IconDownload from '../../icons/IconIconDownload';
import MyTooltip from '../../../HOC/MyTooltip';

import styles from './PopupMenuTable.module.css';

function PopupMenuTableResultList({ event, updateResults, removeEvent, updateEventAndSinged }) {
  const { menus } = useSelector((state) => state.popupTableResultsList);
  const dispatch = useDispatch();

  const menu = menus.find((elm) => elm.eventId === event?.id) || {};
  const clickUpdateEventAndSinged = (e) => {
    e.stopPropagation();
    dispatch(closeResultListMenu(event?.id));
    updateEventAndSinged(event.id);
  };
  const clickUpdateResults = (e) => {
    e.stopPropagation();
    dispatch(closeResultListMenu(event?.id));
    updateResults(event.id);
  };
  const clickRemoveEvent = (e) => {
    e.stopPropagation();
    dispatch(closeResultListMenu(event?.id));
    removeEvent(event.id, event.name);
  };
  const clickDownloadJson = (e) => {
    e.stopPropagation();
    dispatch(closeResultListMenu(event?.id));
    dispatch(fetchResultsJson({ eventId: event?.id }));
  };

  return (
    <>
      {menu?.isVisible && (
        <div
          className={styles.popup}
          onMouseLeave={() => dispatch(closeResultListMenu(event?.id))}
        >
          <ul className={styles.list}>
            <li className={styles.item} onClick={clickUpdateResults}>
              <IconRefresh />
              <span className={styles.label}>Обновление результатов заезда (протокола)</span>
            </li>

            <li className={styles.item} onClick={clickRemoveEvent}>
              <IconDelete squareSize={20} />
              <span className={styles.label}>Удаление заезда и результатов заезда из БД</span>
            </li>

            <li className={styles.item} onClick={clickDownloadJson}>
              <IconDownload />
              <span className={styles.label}>Скачать результаты с Zwift в формате JSON</span>
            </li>
          </ul>

          <MyTooltip
            tooltip={
              'Исправляет отсутствие флагов у некоторых райдеров в протоколе.После данного обновления необходимо запустить обновление результатов'
            }
          >
            <li className={styles.item} onClick={clickUpdateEventAndSinged}>
              <IconRefresh />
              <span className={styles.label}>
                Обновление данных заезда и зарегистрированных райдеров
              </span>
            </li>
          </MyTooltip>
        </div>
      )}
    </>
  );
}

export default PopupMenuTableResultList;
