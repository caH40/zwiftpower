import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserNotifications } from '../../redux/features/api/user-notifications/fetchUserNotifications';

import styles from './ProfileNotification.module.css';

/**
 * @typedef {Object} Notifications
 * @property {boolean} development - Уведомления о разработке.
 * @property {boolean} events - Уведомления о событиях.
 * @property {boolean} news - Уведомления о новостях.
 */

/**
 * Компонент для отображения настроек уведомлений профиля.
 * @param {Object} props - Свойства компонента.
 * @param {Notifications} props.notifications - Настройки уведомлений пользователя.
 * @returns {JSX.Element} Элемент JSX для отображения настроек уведомлений профиля.
 */
export default function ProfileNotification() {
  const { notifications } = useSelector((state) => state.notifications);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserNotifications({ zwiftId }));
  }, []);

  console.log(notifications);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {Object.entries(notifications).map(([key, value]) => (
          <li className={styles.item} key={key}>
            <span>{key}</span>
            <input type="checkbox" defaultChecked={value} />
          </li>
        ))}
      </ul>
    </div>
  );
}
