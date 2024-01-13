import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconMenuInfoDev from '../UI/IconMenuInfoDev/IconMenuInfoDev';
import PopupMenuInfoDev from '../UI/PopupMenuInfoDev/PopupMenuInfoDev';

import IconDelete from '../icons/IconDelete';
import { getAlert } from '../../redux/features/alertMessageSlice';
import { fetchDeleteInfoDev } from '../../redux/features/api/popupInfoDevDeleteSlice';
import IconEdit from '../icons/IconEdit';
import { openPopupForm } from '../../redux/features/popupFormSlice';
import { getTimerLocal } from '../../utils/date-local';

import styles from './MainInfo.module.css';

function MainInfoDev({ isModerator }) {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const informationDev = useSelector((state) => state.popupInfoDevGet.informationDev);

  const dispatch = useDispatch();

  const deleteInfoDev = (id, text) => {
    const response = window.confirm(`Вы действительно хотите удалить релиз: "${text}"`);
    if (!response) {
      const message = `Отмена удаления релиза:  "${text}"`;
      dispatch(getAlert({ message, type: 'warning', isOpened: true }));
      setIsVisibleDelete(false);
      return;
    }
    dispatch(fetchDeleteInfoDev({ id }));
    setIsVisibleDelete(false);
  };

  const openPopupFormRelease = (releaseData) => {
    dispatch(openPopupForm({ releaseData }));
    setIsVisibleDelete(false);
  };

  return (
    <div>
      <div className={styles.block}>
        {isModerator && (
          <IconMenuInfoDev
            setIsVisible={setIsVisibleMenu}
            setIsVisibleDelete={setIsVisibleDelete}
            setIsVisibleEdit={setIsVisibleEdit}
          />
        )}
        <PopupMenuInfoDev
          isVisible={isVisibleMenu}
          setIsVisible={setIsVisibleMenu}
          setIsVisibleDelete={setIsVisibleDelete}
          setIsVisibleEdit={setIsVisibleEdit}
        />
        <h3 className={styles.title}>Изменения на сайте</h3>
        <div className={styles.block__text}>
          <ul className={styles.list__dev}>
            {informationDev.slice(0, 10).map((info) => (
              <li className={styles.item} key={info._id}>
                <div className={styles.li__inner}>
                  <div>
                    <span className={styles.date}>
                      {getTimerLocal(info.releaseDate, 'DDMMYY')}
                    </span>
                    <span className={styles.text}>{info.text}</span>
                  </div>
                  {isVisibleDelete && (
                    <div
                      className={styles.icon}
                      onClick={() => deleteInfoDev(info._id, info.text)}
                    >
                      <IconDelete />
                    </div>
                  )}
                  {isVisibleEdit && (
                    <div className={styles.icon} onClick={() => openPopupFormRelease(info)}>
                      <IconEdit />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainInfoDev;
