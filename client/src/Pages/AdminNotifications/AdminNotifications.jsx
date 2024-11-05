import FormNotification from '../../components/UI/FormNotification/FormNotification';
import useTitle from '../../hook/useTitle';

import styles from './AdminNotifications.module.css';

/**
 * Страница создания/отправки оповещений на email.
 */
export default function AdminNotifications() {
  useTitle('Оповещения пользователей');

  return (
    <div className={styles.wrapper}>
      <FormNotification />
    </div>
  );
}
