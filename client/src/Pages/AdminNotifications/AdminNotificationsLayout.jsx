import { Outlet } from 'react-router-dom';

import IconEmail from '../../components/icons/IconEmail';
import NavNotifications from '../../components/UI/NavNotifications/NavNotifications';

import styles from './AdminNotificationsLayout.module.css';

const items = [
  {
    to: '/admin/notifications/create-email',
    title: 'Создать письмо для рассылки',
    icon: IconEmail,
  },
  {
    to: '/admin/notifications/events-email-preview',
    title: 'Рассылка предстоящих эвентов',
    icon: IconEmail,
  },
];

/**
 * Лейаут для страниц оповещений на email.
 */
export default function AdminNotificationsLayout() {
  return (
    <div className={styles.wrapper}>
      <NavNotifications items={items} />

      <Outlet />
    </div>
  );
}
