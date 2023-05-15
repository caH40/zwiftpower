import React from 'react';
import { useDispatch } from 'react-redux';

import IconEdit from '../../icons/IconEdit';
import PopupMenuTableResultList from '../../UI/PopupMenuTable/PopupMenuTableResultList';
import { showResultListMenu } from '../../../redux/features/popupTableResultsListSlice';

import styles from './Td.module.css';

function TdScheduleMenuTableResultList({
  event,
  updateResults,
  removeEvent,
  updateEventAndSinged,
}) {
  const dispatch = useDispatch();
  return (
    <td>
      <div className={styles.icons} onClick={() => dispatch(showResultListMenu(event.id))}>
        <IconEdit addCls="pointer" />
        <PopupMenuTableResultList
          event={event}
          updateResults={updateResults}
          updateEventAndSinged={updateEventAndSinged}
          removeEvent={removeEvent}
        />
      </div>
    </td>
  );
}

export default TdScheduleMenuTableResultList;
