import { useSelector } from 'react-redux';

import ExternalAccountCard from './ExternalAccountCard';
import { EXTERNAL_SERVICES } from './services';

import styles from './ExternalAccounts.module.css';

/**
 * Блок привязки сторонних приложений (Strava, Garmin Connect) в настройках аккаунта.
 * Хранится только ID аккаунта, ссылка на профиль собирается по шаблону сервиса.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {Record<string, string | { accountId?: string, id?: string }>} [props.externalAccounts] - Привязанные
 * аккаунты из профиля пользователя, например `{ strava: '12345678' }`.
 * @param {(payload: { service: string, accountId: string }) => void} [props.onSave] - Обработчик сохранения ID.
 */
export default function ExternalAccounts({ externalAccounts = {}, onSave }) {
  const savedIds = useSelector((state) => state.externalAccounts.externalAccounts);

  /**
   * Достаёт ID аккаунта: сначала сохранённый в Redux, затем из профиля пользователя.
   * Поддерживает строку, объект `{ accountId }` и объект `{ id }`.
   * @param {string} serviceId - Идентификатор сервиса.
   * @returns {string} ID аккаунта или пустая строка.
   */
  const getAccountId = (serviceId) => {
    const savedId = savedIds?.[serviceId];

    if (savedId) {
      return savedId;
    }

    const account = externalAccounts?.[serviceId];

    if (typeof account === 'string') {
      return account;
    }

    return account?.accountId || account?.id || '';
  };

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {EXTERNAL_SERVICES.map((service) => (
          <ExternalAccountCard
            key={service.id}
            service={service}
            initialValue={getAccountId(service.id)}
            onSave={onSave}
          />
        ))}
      </div>
    </section>
  );
}
