import { Link } from 'react-router-dom';

import styles from './SignedRidersLinks.module.css';

/**
 * Линки для страницы зарегистрированных участников на эвент.
 */
export default function SignedRidersLinks({
  eventId,
  clubName,
  microserviceExternalResourceId,
  microserviceEventVisibility,
}) {
  return (
    <>
      <a
        className={styles.button__link}
        href={`zwift://event/${eventId}`}
        onClick={(e) => {
          e.preventDefault();

          const timeout = setTimeout(() => {
            window.location.href = `https://www.zwift.com/eu/events/view/${eventId}`;
          }, 1000); // 1 секунда на открытие приложения

          // Попытка открыть приложение
          window.location.href = `zwift://event/${eventId}`;

          // Очистка таймера, если вдруг сработал deep link
          window.addEventListener('blur', () => {
            clearTimeout(timeout);
          });
        }}
        rel="noreferrer"
        target="_blank"
      >
        <div>
          <span className={styles.button__title}>Регистрация</span>
          <span className={styles.button__additional}>
            {microserviceEventVisibility === 'DEFINED_BY_RESOURCE_ID' &&
              `(только для участников клуба ${clubName})`}
          </span>
        </div>
      </a>
      {/* javascript:window.open('https://zwift.com/events/view/4913266','join_zwift_event');return false */}
      <Link
        className={styles.button__link}
        to={`https://www.zwift.com/eu/clubs/${microserviceExternalResourceId}/join`}
        target="_blank"
        rel="noreferrer"
      >
        <div>
          <span className={styles.button__title}>Вступить в клуб</span>
          <span className={styles.button__additional}>{clubName}</span>
        </div>
      </Link>
    </>
  );
}
