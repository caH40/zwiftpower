import useTitle from '../../hook/useTitle';

import styles from './SiteServices.module.css';

/**
 * Страница платных сервисов на сайте.
 */
export default function SiteServices() {
  useTitle('Сервисы на сайте');

  return <div className={styles.wrapper}>SiteServices</div>;
}
