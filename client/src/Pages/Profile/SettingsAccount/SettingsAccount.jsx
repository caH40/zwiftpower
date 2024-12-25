import useTitle from '../../../hook/useTitle';

import styles from './SettingsAccount.module.css';

/**
 * Страница настройки аккаунта.
 */
export default function SettingsAccount() {
  useTitle('Настройка аккаунта');
  return <div className={styles.wrapper}>SettingsAccount</div>;
}
