import React from 'react';
import { useDispatch } from 'react-redux';

import IconEdit from '../../icons/IconEdit';
import PopupMenuInTable from '../../UI/PopupMenuTableScheduleList/PopupMenuTableScheduleList';
import { showScheduleMenu } from '../../../redux/features/popupTableScheduleSlice';

import styles from './Td.module.css';

function TdScheduleMenu({ event, updateEvent, removeEvent }) {
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

export default TdScheduleMenu;
