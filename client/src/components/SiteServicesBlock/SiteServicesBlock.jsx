import SiteService from '../SiteService/SiteService';

import styles from './SiteServicesBlock.module.css';

/**
 * Список сервисов сайта
 */
export default function SiteServicesBlock({ services, theme }) {
  return (
    <div className={styles.wrapper}>
      {services.map((service) => (
        <SiteService service={service} key={service.id} theme={theme} />
      ))}
    </div>
  );
}
