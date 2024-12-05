import { useDispatch, useSelector } from 'react-redux';

import { closeScheduleMenu } from '../../../redux/features/popupTableScheduleSlice';
import IconRefresh from '../../icons/IconRefresh';
import IconDelete from '../../icons/IconDelete';

import styles from './PopupMenuTable.module.css';

/**
 * popup меню для взаимодействия с выбранным Эвентом на странице Расписания Эвентов
 */
function PopupMenuTableScheduleList({ event, updateEvent, removeEvent }) {
  const { menus } = useSelector((state) => state.popupTableSchedule);
  const { moderator } = useSelector((state) => state.checkAuth.value.user);
  const dispatch = useDispatch();

  // Проверка что текущий Эвент создан в клубе, который может модерировать пользователь.
  const isAllowedModerate = moderator?.clubs.includes(event.microserviceExternalResourceId);

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
              <IconRefresh squareSize={20} />
              <span className={styles.label}>Обновление данных заезда</span>
            </li>
            {isAllowedModerate && (
              <li className={styles.item} onClick={clickButton}>
                <IconDelete squareSize={20} />
                <span className={styles.label}>Удаление заезда из БД</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default PopupMenuTableScheduleList;
