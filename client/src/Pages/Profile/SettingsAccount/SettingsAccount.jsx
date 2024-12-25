import { useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';
import FormAccount from '../../../components/UI/FormAccount/FormAccount';
import JSONBlock from '../../../components/JSONBlock/JSONBlock';

import styles from './SettingsAccount.module.css';

/**
 * Страница настройки аккаунта.
 */
export default function SettingsAccount() {
  const { user } = useSelector((state) => state.checkAuth.value);

  useTitle('Настройка аккаунта');
  return (
    <div className={styles.wrapper}>
      <div className={styles.spacer}>
        <FormAccount role={user.role} username={user.username} userId={user.id} />
      </div>
      <JSONBlock json={user} />
    </div>
  );
}
