import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { showMenu } from '../../../redux/features/menuBurgerSlice';

import styles from './PopupMenu.module.css';

function PopupMenu() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.checkAuth.value);

  const isModerator = ['admin', 'moderator'].includes(user.role);

  return (
    <div className={styles.modal__overlay} onClick={() => dispatch(showMenu())}>
      <div className={styles.popup}>
        <ul className={styles.list}>
          {isModerator && (
            <>
              {/* <li className={styles.item}>
                <Link to="/bot" className={styles.link}>
                  Бот
                </Link>
              </li> */}
              <li className={styles.item}>
                <Link to="/logs/admin" className={styles.link}>
                  Логи по Эвентам
                </Link>
              </li>
              <li className={styles.item}>
                <Link to="/logs/errors" className={styles.link}>
                  Логи по ошибкам
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
