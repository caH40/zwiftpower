import useTitle from '../../../hook/useTitle';

import styles from './AdminFinishProtocol.module.css';

/**
 * Страница редактирования пакета конфигурации финишного протокола.
 */
export default function AdminFinishProtocol() {
  useTitle('Финишный протокол');
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Редактирование пакетов конфигурации финишного протокола</h2>
    </section>
  );
}
