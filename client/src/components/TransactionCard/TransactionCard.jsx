import cn from 'classnames';

import styles from './TransactionCard.module.css';

/**
 * Данные по платному сервису сайта.
 */
export default function TransactionCard({ transaction, theme = 'gray' }) {
  // Форматирование дат
  // const startDate = service ? new Date(service.startDate).toLocaleDateString() : '';
  // const endDate = service ? new Date(service.endDate).toLocaleDateString() : '';

  return (
    <dl className={cn(styles.list, styles[theme])}>
      <dt className={styles.title}>Описание</dt>
      <dd className={styles.description}>{transaction}</dd>
    </dl>
  );
}
