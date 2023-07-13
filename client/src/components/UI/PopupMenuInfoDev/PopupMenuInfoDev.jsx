// меню в редактирования блока информации разработчика
import React from 'react';
import { useDispatch } from 'react-redux';

import IconRefresh from '../../icons/IconRefresh';
import IconDelete from '../../icons/IconDelete';
import IconEdit from '../../icons/IconEdit';
import { openPopupForm } from '../../../redux/features/api/popupFormSlice';

import styles from './PopupMenuInfoDev.module.css';

function PopupMenuInfoDev({ isVisible, setIsVisible }) {
  const dispatch = useDispatch();

  const clickAddRelease = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    dispatch(openPopupForm({ isVisible: true, form: {} }));
  };
  const clickDeleteRelease = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };
  const clickEditRelease = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={styles.popup} onMouseLeave={() => setIsVisible(false)}>
          <ul className={styles.list}>
            <li className={styles.item} onClick={clickAddRelease}>
              <IconRefresh />
              <span className={styles.label}>Добавление релиза</span>
            </li>

            <li className={styles.item} onClick={clickEditRelease}>
              <IconEdit />
              <span className={styles.label}>Изменение релиза</span>
            </li>
          </ul>
          <li className={styles.item} onClick={clickDeleteRelease}>
            <IconDelete />
            <span className={styles.label}>Удаление релиза</span>
          </li>
        </div>
      )}
    </>
  );
}

export default PopupMenuInfoDev;
