import { useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';

import styles from './SettingsServicesAndFinances.module.css';

/**
 * Страница финансов и оплаченных сервисов.
 */
export default function SettingsServicesAndFinances() {
  useTitle('Настройка оповещений');

  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);
  return (
    <div>
      {zwiftIdAuth && <div className={styles.wrapper__block}>SettingsServicesAndFinances</div>}
    </div>
  );
}
