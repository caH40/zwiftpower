import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { showMenu } from '../../../redux/features/menuBurgerSlice';

import styles from './PopupMenu.module.css';

function PopupMenu() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.checkAuth.value);

  // const isAdmin = ['admin'].includes(user.role);
  const isModerator = ['admin', 'moderator'].includes(user.role);

  return (
    <div className={styles.modal__overlay} onClick={() => dispatch(showMenu())}>
      <div className={styles.popup}>
        <ul className={styles.list}>
          {isModerator && (
            <>
              <li className={styles.item}>
                <Link to="/edit/stage" className={styles.link}>
                  Stages
                </Link>
              </li>
              <li className={styles.item}>
                <Link to="/edit/series" className={styles.link}>
                  Series
                </Link>
              </li>
              <li className={styles.item}>
                <Link to="/edit/upload" className={styles.link}>
                  Загрузка
                </Link>
              </li>
              <li className={styles.item}>
                <Link to="/edit/riders" className={styles.link}>
                  Райдеры
                </Link>
              </li>
              <li className={styles.item}>
                <Link to="/bot" className={styles.link}>
                  Бот
                </Link>
              </li>
              <li className={styles.item}>
                <Link to="/logs/admin" className={styles.link}>
                  Логи по Эвентам
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PopupMenu;
