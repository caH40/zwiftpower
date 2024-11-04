import { useDispatch, useSelector } from 'react-redux';

import { putUserNotifications } from '../../redux/features/api/user-settings/putUserNotification';
import { putNotifications } from '../../redux/features/api/user-settings/userSettingsSlice';
import CheckboxSimple from '../UI/Checkbox/CheckboxSimple';
import { getTranslation } from '../../utils/translation';

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
export default function ProfileNotification({ zwiftIdAuth }) {
  const { notifications } = useSelector((state) => state.userSettings);

  const dispatch = useDispatch();

  const handleCheckboxChange = async (event) => {
    const { name, checked } = event.target;

    const notificationsChanged = { ...notifications, [name]: checked };
    dispatch(
      putUserNotifications({ zwiftId: zwiftIdAuth, notifications: notificationsChanged })
    ).then((data) => {
      if (data.meta.requestStatus === 'fulfilled') {
        dispatch(putNotifications(data.payload.data));
      }
    });
  };

  // Задаем фиксированный порядок для отображения
  const orderedKeys = ['news', 'events', 'development'];

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Оповещения на e-mail</h3>
      <ul className={styles.list}>
        {orderedKeys.map((key) => (
          <li className={styles.item} key={key}>
            <span>{getTranslation(key)}</span>
            <CheckboxSimple
              checked={notifications[key]}
              handleCheckboxChange={handleCheckboxChange}
              name={key}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
