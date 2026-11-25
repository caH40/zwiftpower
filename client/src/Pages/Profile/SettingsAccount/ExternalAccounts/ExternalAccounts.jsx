import ExternalAccountCard from './ExternalAccountCard';
import { EXTERNAL_SERVICES } from './services';

import styles from './ExternalAccounts.module.css';

/**
 * Блок привязки сторонних приложений (Strava, Garmin Connect) в настройках аккаунта.
 * На этом шаге ссылка хранится только в состоянии компонента: сохранение на сервере — следующий шаг.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {Record<string, string | { url: string }>} [props.externalAccounts] - Привязанные аккаунты
 * из профиля пользователя, например `{ strava: 'https://www.strava.com/athletes/1' }`.
 * @param {(payload: { service: string, url: string }) => void} [props.onSave] - Обработчик сохранения ссылки.
 */
export default function ExternalAccounts({ externalAccounts = {}, onSave }) {
  /**
   * Достаёт ссылку из значения `externalAccounts`, поддерживая и строку, и объект `{ url }`.
   * @param {string} serviceId - Идентификатор сервиса.
   * @returns {string} Ссылка на профиль или пустая строка.
   */
  const getLink = (serviceId) => {
    const account = externalAccounts?.[serviceId];

    if (typeof account === 'string') {
      return account;
    }

    return account?.url || '';
  };

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {EXTERNAL_SERVICES.map((service) => (
          <ExternalAccountCard
            key={service.id}
            service={service}
            initialValue={getLink(service.id)}
            onSave={onSave}
          />
        ))}
      </div>
    </section>
  );
}
