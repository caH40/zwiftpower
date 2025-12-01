import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { unsubscribeNotifications } from '../../api/unsubscribeNotifications';
import useTitle from '../../hook/useTitle';

import styles from './UnsubscribeNotifications.module.css';

/**
 * Страница отписки от всех оповещений
 */
export default function UnsubscribeNotifications() {
  useTitle('Оповещения');

  const { userId } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function start() {
      try {
        const res = await unsubscribeNotifications(userId);
        setMessage(res.message);
      } catch (error) {
        setMessage(error?.response?.data?.message || 'Непредвиденная ошибка');
      }
    }

    start();

    return () => setMessage(null);
  }, [userId]);

  return (
    <section className={styles.support}>
      <p className={styles.text}>{message}</p>
    </section>
  );
}
