import { useDispatch } from 'react-redux';

import IconEdit from '../../icons/IconEdit';
import PopupMenuInTable from '../../UI/PopupMenuTable/PopupMenuTableScheduleList';
import { showScheduleMenu } from '../../../redux/features/popupTableScheduleSlice';

import styles from './Td.module.css';

/**
 * TD элемент с
 * popup меню для взаимодействия с выбранным Эвентом на странице Расписания Эвентов
 */
function TdScheduleMenuTableScheduleList({ event, updateEvent, removeEvent }) {
  const dispatch = useDispatch();
  return (
    <td>
      <div className={styles.icons} onClick={() => dispatch(showScheduleMenu(event.id))}>
        <IconEdit addCls="pointer" />
        <PopupMenuInTable event={event} updateEvent={updateEvent} removeEvent={removeEvent} />
      </div>
    </td>
  );
}

export default TdScheduleMenuTableScheduleList;
