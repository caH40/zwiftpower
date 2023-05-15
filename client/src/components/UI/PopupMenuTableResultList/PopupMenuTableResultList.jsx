import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeResultListMenu } from '../../../redux/features/popupTableResultsListSlice';
import IconRefresh from '../../icons/IconRefresh';
import IconDelete from '../../icons/IconDelete';
import MyTooltip from '../../../HOC/MyTooltip';

import styles from './PopupMenuTableResultList.module.css';

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
              <IconDelete />
              <span className={styles.label}>Удаление заезда и результатов заезда из БД</span>
            </li>
          </ul>

          <MyTooltip
            toolTip={
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

// <td>
//   <div className={styles.box__icons}>
//     <IconRefresh
//       getClick={() => updateResults(event.id)}
//       toolTip={'Обновление результатов заезда (протокола)'}
//       addCls={'pointer'}
//     />
//     <IconDelete
//       getClick={() => removeEvent(event.id, event.name)}
//       toolTip={'Удаление заезда и результатов заезда из БД'}
//       addCls={'pointer'}
//     />
//     <IconRefresh
//       getClick={() => updateEventAndSinged(event.id)}
//       toolTip={
//         'Обновление данных заезда и зарегистрированных райдеров.
// Исправляет отсутствие флагов у некоторых райдеров в протоколе.
//  После данного обновления необходимо запустить обновление результатов'
//       }
//       addCls={'pointer'}
//     />
//   </div>
// </td>
