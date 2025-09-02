import cn from 'classnames';

import styles from './SiteService.module.css';

/**
 * Данные по платному сервису сайта.
 */
export default function SiteService({ service, theme }) {
  // Форматирование дат
  const startDate = service ? new Date(service.startDate).toLocaleDateString() : '';
  const endDate = service ? new Date(service.endDate).toLocaleDateString() : '';

  return (
    <dl className={cn(styles.list, styles[theme])}>
      <dt className={styles.title}>Описание</dt>
      <dd className={styles.description}>{service.description}</dd>

      <dt className={styles.title}>Период</dt>
      <dd className={styles.description}>
        {startDate} — {endDate}
      </dd>

      <dt className={styles.title}>Цена</dt>
      <dd className={styles.description}>
        {service.amount?.value} {service.amount?.currency}
      </dd>
    </dl>
  );
}
