import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../../hook/useTitle';
import {
  fetchAllSiteServices,
  fetchPurchasableSiteServices,
} from '../../../redux/features/api/site_service/fetchSiteServices';
import PaymentServicesBlock from '../../../components/PaymentServicesBlock/PaymentServicesBlock';
import SiteServicesBlock from '../../../components/SiteServicesBlock/SiteServicesBlock';
import {
  resetPurchasableSiteServices,
  resetSiteServices,
} from '../../../redux/features/api/site_service/siteServiceSlice';
import TransactionCard from '../../../components/TransactionCard/TransactionCard';
import { fetchPaymentTransactions } from '../../../redux/features/api/payment_notifications/fetchPaymentNotifications';
import { resetPaymentTransactions } from '../../../redux/features/api/payment_notifications/paymentNotificationsSlice';

import styles from './SettingsServicesAndFinances.module.css';

/**
 * Страница финансов и оплаченных сервисов.
 */
export default function SettingsServicesAndFinances() {
  useTitle('Финансы и Сервисы');
  const { siteServices, purchasableSiteServices } = useSelector((state) => state.siteServices);
  const { paymentTransactions } = useSelector((state) => state.paymentNotifications);
  const { user } = useSelector((state) => state.checkAuth.value);
  const dispatch = useDispatch();

  console.log(paymentTransactions);

  useEffect(() => {
    dispatch(fetchPurchasableSiteServices());
    dispatch(fetchAllSiteServices());
    dispatch(fetchPaymentTransactions({ userId: user.id }));

    return () => {
      dispatch(resetSiteServices());
      dispatch(resetPurchasableSiteServices());
      dispatch(resetPaymentTransactions());
    };
  }, []);

  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);

  return (
    <div className={styles.wrapper}>
      <div>
        <h3 className={styles.title}>Активные сервисы</h3>
        <SiteServicesBlock services={siteServices.filter((s) => !s.expired)} theme={'green'} />
      </div>

      <div>
        <h3 className={styles.title}>Пополнить или оплатить сервисы</h3>

        {zwiftIdAuth && (
          <div className={styles.wrapper__block}>
            {purchasableSiteServices?.length > 0 ? (
              <PaymentServicesBlock services={purchasableSiteServices} user={user} />
            ) : (
              <div>Нет доступных сервисов для оплаты</div>
            )}
          </div>
        )}
      </div>

      <div>
        <h3 className={styles.title}>Истёкшие или завершённые сервисы</h3>
        <SiteServicesBlock services={siteServices.filter((s) => s.expired)} theme={'red'} />
      </div>

      <div>
        <h3 className={styles.title}>История транзакций и покупок или Платежи за сервисы</h3>
        {zwiftIdAuth && (
          <div className={styles.wrapper__block}>
            <TransactionCard transaction={'transaction'} />
          </div>
        )}
      </div>
    </div>
  );
}
