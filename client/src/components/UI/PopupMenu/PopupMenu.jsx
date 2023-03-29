import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { showMenu } from '../../../redux/features/menuBurgerSlice';

import styles from './PopupMenu.module.css';

function PopupMenu() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.checkAuth.value);

  const isAdmin = ['admin'].includes(user.role);
  const isModerator = ['admin', 'moderator'].includes(user.role);

  return (
    <div className={styles.modal__overlay} onClick={() => dispatch(showMenu())}>
      <div className={styles.popup}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/" className={styles.link}>
              Главная
            </Link>
          </li>

          {status ? (
            <li className={styles.item}>
              <Link to="/profile" className={styles.link}>
                Профиль
              </Link>
            </li>
          ) : undefined}

          {isModerator ? (
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
            </>
          ) : undefined}

          {isAdmin ? (
            <li className={styles.item}>
              <Link to="/edit/users" className={styles.link}>
                Пользователи
              </Link>
            </li>
          ) : undefined}
        </ul>
      </div>
    </div>
  );
}

export default PopupMenu;
