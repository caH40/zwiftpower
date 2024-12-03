import { getTimerLocal } from '../../utils/date-local';

import styles from './CardBotZwift.module.css';

/**
 * Карточка бота-модератора клуба в звифте.
 * @param {Object} props - Пропсы с родительского компонента.
 * @param {TZwiftTokenDto} props.token - Приоритетность ключа.
 * @typedef {Object} TZwiftTokenDto
 * @property {string} organizerId - ID организатора в виде строки.
 * @property {Object|null} tokenDecoded - Декодированный токен.
 * @property {string} [tokenDecoded.expiresAt] - Время истечения токена в формате ISO.
 * @property {string} [tokenDecoded.issuedAt] - Время выпуска токена в формате ISO.
 * @property {string[]} [tokenDecoded.audience] - Целевые сервисы токена.
 * @property {string} [tokenDecoded.userId] - Уникальный ID пользователя.
 * @property {string} [tokenDecoded.name] - Имя пользователя.
 * @property {string} [tokenDecoded.email] - Электронная почта пользователя.
 * @property {string} username - Имя пользователя (email бота).
 * @property {'main'|'secondary'} importance - Важность токена.
 */

export default function CardBotZwift({ token }) {
  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>{`Данные Бота-модератора (${
        token.importance === 'main' ? 'основной' : 'дополнительный'
      })`}</h3>

      <dl className={styles.list}>
        <dt className={styles.term}>username (email)</dt>
        <dd className={styles.description}>{token.username}</dd>

        {token.tokenDecoded && (
          <>
            <dt className={styles.term}>Время истечения токена</dt>
            <dd className={styles.description}>
              {getTimerLocal(token.tokenDecoded.expiresAt)}
            </dd>

            <dt className={styles.term}>Время выпуска токена</dt>
            <dd className={styles.description}>{getTimerLocal(token.tokenDecoded.issuedAt)}</dd>

            <dt className={styles.term}>Имя в Zwift</dt>
            <dd className={styles.description}>{token.tokenDecoded.name}</dd>

            <dt className={styles.term}>email в Zwift</dt>
            <dd className={styles.description}>{token.tokenDecoded.email}</dd>

            <dt className={styles.term}>Уникальный ID</dt>
            <dd className={styles.description}>{token.tokenDecoded.userId}</dd>

            <dt className={styles.term}>Целевые сервисы токена</dt>
            {token.tokenDecoded.audience.map((audience) => (
              <dd className={styles.description} key={audience}>
                {audience}
              </dd>
            ))}
          </>
        )}
      </dl>
    </section>
  );
}
