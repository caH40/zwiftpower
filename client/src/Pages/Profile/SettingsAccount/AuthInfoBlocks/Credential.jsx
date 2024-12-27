import styles from './AuthInfoBlock.module.css';

/**
 * Блок информации с сервиса аутентификации VK ID. Так же используется для привязке сервиса к аккаунту.
 */
export default function CredentialAuthInfoBlock({ user }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box__subtitle}>
        <img
          className={styles.icon__service}
          src="/images/credential.svg"
          alt="Credential icon"
        />
        <h4 className={styles.subtitle}>Вход по логину/паролю</h4>
      </div>

      <div className={styles.service}>
        <dl className={styles.list}>
          <dt className={styles.term}>username</dt>
          <dd className={styles.description}>{user.username}</dd>

          <dt className={styles.term}>email</dt>
          <dd className={styles.description}>{user.email}</dd>
        </dl>
      </div>
    </div>
  );
}
