import { useSelector } from 'react-redux';

import ExternalAccountCard from './ExternalAccountCard';
import { EXTERNAL_SERVICES } from './services';

import styles from './ExternalAccounts.module.css';

/**
 * Блок привязки сторонних приложений (Strava, Garmin Connect) в настройках аккаунта.
 * Привязанные аккаунты приходят с сервера в `user.externalAccountServices`
 * массивом `{ service, accountId }`; сохранённые за текущую сессию ID берутся из Redux.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {Array<{ service: string, accountId: string }>} [props.externalAccountServices] - Привязанные
 * аккаунты из профиля пользователя, например `[{ service: 'strava', accountId: '43545' }]`.
 * @param {(payload: { service: string, accountId: string }) => void} [props.onSave] - Обработчик сохранения ID.
 */
export default function ExternalAccounts({ externalAccountServices = [], onSave }) {
  const savedIds = useSelector((state) => state.externalAccounts.externalAccounts);
  // Приводим ответ сервера к массиву: поле может не прийти или прийти как null.
  const linkedServices = Array.isArray(externalAccountServices) ? externalAccountServices : [];

  /**
   * Достаёт ID аккаунта: сначала сохранённый в Redux, затем из профиля пользователя.
   * @param {string} serviceId - Идентификатор сервиса.
   * @returns {string} ID аккаунта или пустая строка.
   */
  const getAccountId = (serviceId) => {
    const savedId = savedIds?.[serviceId];

    if (savedId) {
      return savedId;
    }

    const account = linkedServices.find((item) => item.service === serviceId);

    return account?.accountId ? String(account.accountId) : '';
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
