import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';
import { fetchSiteServices } from '../../../redux/features/api/site_service/fetchSiteServices';
import PaymentServicesBlock from '../../../components/PaymentServicesBlock/PaymentServicesBlock';

import styles from './SettingsServicesAndFinances.module.css';

/**
 * Страница финансов и оплаченных сервисов.
 */
export default function SettingsServicesAndFinances() {
  useTitle('Финансы и Сервисы');
  const { siteServices } = useSelector((state) => state.siteServices);
  const { user } = useSelector((state) => state.checkAuth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSiteServices());
  }, []);

  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);
  return (
    <div className={styles.wrapper}>
      <div>
        <h3 className={styles.title}>Пополнить или оплатить сервисы</h3>
        {zwiftIdAuth && siteServices?.length > 0 && (
          <div className={styles.wrapper__block}>
            <PaymentServicesBlock services={siteServices} user={user} />
          </div>
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
