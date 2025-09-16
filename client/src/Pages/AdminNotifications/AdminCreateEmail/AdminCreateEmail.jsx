import { useSelector } from 'react-redux';

import FormNotification from '../../../components/UI/FormNotification/FormNotification';
import useTitle from '../../../hook/useTitle';

import styles from './AdminCreateEmail.module.css';

/**
 * Страница создания/отправки оповещений на email.
 */
export default function AdminCreateEmailPage() {
  useTitle('Оповещения пользователей');
  const { letterPreview, status } = useSelector((state) => state.notification);

  return (
    <div className={styles.wrapper}>
      <FormNotification loading={status === 'loading'} />

      {letterPreview && (
        <section className={styles.wrapper__preview}>
          <div className={styles.preview} dangerouslySetInnerHTML={{ __html: letterPreview }} />
        </section>
      )}
    </div>
  );
}
