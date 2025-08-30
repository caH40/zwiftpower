import SiteService from '../SiteService/SiteService';

import styles from './SiteServicesBlock.module.css';

/**
 * Список сервисов сайта
 */
export default function SiteServicesBlock({ services, theme }) {
  if (services.length === 0) {
    return <div>Нет сервисов</div>;
  }

  return (
    <div className={styles.wrapper}>
      {services.map((service) => (
        <SiteService service={service} key={service.id} theme={theme} />
      ))}
    </div>
  );
}
