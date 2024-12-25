import { useSelector } from 'react-redux';

import ProfileNotification from '../../../components/ProfileNotification/ProfileNotification';
import useTitle from '../../../hook/useTitle';

import styles from './SettingsNotifications.module.css';

/**
 * Страница настройки оповещений пользователей по email.
 */
export default function SettingsNotifications() {
  useTitle('Настройка оповещений');

  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);
  return (
    <div>
      {zwiftIdAuth && (
        <div className={styles.wrapper__block}>
          <ProfileNotification zwiftIdAuth={zwiftIdAuth} />
        </div>
      )}
    </div>
  );
}
