import { getTimerLocal } from '../../utils/date-local';
import IconDelete from '../icons/IconDelete';
import IconEdit from '../icons/IconEdit';

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
export default function CardBotZwift({ token, handlerDelete, handlerEdit }) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        {`Данные бота-модератора (${
          token.importance === 'main' ? 'основной' : 'дополнительный'
        })`}
      </h2>
      <div className={styles.wrapper__icons}>
        <IconEdit squareSize={18} getClick={() => handlerEdit(token.importance)} />
        <IconDelete squareSize={18} getClick={() => handlerDelete(token._id)} />
      </div>

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
            <dd className={styles.description}>
              {getTimerLocal(token.tokenDecoded.issuedAt, 'DDMMYYHms')}
            </dd>

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
