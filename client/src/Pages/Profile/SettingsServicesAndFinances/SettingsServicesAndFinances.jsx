import { useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';

import styles from './SettingsServicesAndFinances.module.css';

/**
 * Страница финансов и оплаченных сервисов.
 */
export default function SettingsServicesAndFinances() {
  useTitle('Финансы и Сервисы');

  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);
  return (
    <div className={styles.wrapper}>
      <div>
        <h3 className={styles.title}>Пополнить или оплатить сервисы</h3>
        {zwiftIdAuth && (
          <div className={styles.wrapper__block}>Пополнить или оплатить сервисы</div>
        )}
      </div>

      <div>
        <h3 className={styles.title}>Ваши активные сервисы или Подписки в работе</h3>
        {zwiftIdAuth && (
          <div className={styles.wrapper__block}>
            Ваши активные сервисы или Подписки в работе
          </div>
        )}
      </div>

      <div>
        <h3 className={styles.title}>Истёкшие или завершённые сервисы</h3>
        {zwiftIdAuth && (
          <div className={styles.wrapper__block}>Истёкшие или завершённые сервисы</div>
        )}
      </div>

      <div>
        <h3 className={styles.title}>История транзакций и покупок или Платежи за сервисы</h3>
        {zwiftIdAuth && (
          <div className={styles.wrapper__block}>
            История транзакций и покупок или Платежи за сервисы
          </div>
        )}
      </div>
    </div>
  );
}
