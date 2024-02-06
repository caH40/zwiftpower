// меню в редактирования блока информации разработчика
import React from 'react';
import { useDispatch } from 'react-redux';

import IconAdd from '../../icons/IconAdd';
import IconDelete from '../../icons/IconDelete';
import IconEdit from '../../icons/IconEdit';
import { openPopupForm } from '../../../redux/features/popupFormSlice';

import styles from './PopupMenuInfoDev.module.css';

function PopupMenuInfoDev({ isVisible, setIsVisible, setIsVisibleDelete, setIsVisibleEdit }) {
  const dispatch = useDispatch();

  const clickAddRelease = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    dispatch(
      openPopupForm({
        releaseData: { releaseDate: Date.now(), text: '', version: '' },
        method: 'post',
      })
    );
  };
  const clickEditRelease = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsVisibleEdit(true);
  };
  const clickDeleteRelease = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsVisibleDelete(true);
  };

  return (
    <>
      {isVisible && (
        <div className={styles.popup} onMouseLeave={() => setIsVisible(false)}>
          <ul className={styles.list}>
            <li className={styles.item} onClick={clickAddRelease}>
              <IconAdd squareSize={20} />
              <span className={styles.label}>Добавление релиза</span>
            </li>

            <li className={styles.item} onClick={clickEditRelease}>
              <IconEdit />
              <span className={styles.label}>Изменение релиза</span>
            </li>
          </ul>
          <li className={styles.item} onClick={clickDeleteRelease}>
            <IconDelete squareSize={20} />
            <span className={styles.label}>Удаление релиза</span>
          </li>
        </div>
      )}
    </>
  );
}

export default PopupMenuInfoDev;
