import styles from './AuthInfoBlock.module.css';

/**
 * Блок информации с сервиса аутентификации VK ID. Так же используется для привязке сервиса к аккаунту.
 */
export default function VkIdAuthInfoBlock({ user }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box__subtitle}>
        <img className={styles.icon__service} src="/images/vk.svg" alt="OAuth icon" />
        <h4 className={styles.subtitle}>VK ID</h4>
      </div>

      <div className={styles.service}>
        <img src={user.externalAccounts.vk.avatarSrc} className={styles.image} alt="Avatar" />

        <dl className={styles.list}>
          <dt className={styles.term}>id</dt>
          <dd className={styles.description}>{user.externalAccounts.vk.id}</dd>

          <dt className={styles.term}>firstName</dt>
          <dd className={styles.description}>{user.externalAccounts.vk.firstName}</dd>

          <dt className={styles.term}>lastName</dt>
          <dd className={styles.description}>{user.externalAccounts.vk.lastName}</dd>

          <dt className={styles.term}>email</dt>
          <dd className={styles.description}>{user.externalAccounts.vk.email}</dd>
        </dl>
      </div>
    </div>
  );
}
