import { useSelector } from 'react-redux';

import { useServicesAndFinances } from '../../../hook/useServicesAndFinances';
import useTitle from '../../../hook/useTitle';
import PaymentServicesBlock from '../../../components/PaymentServicesBlock/PaymentServicesBlock';
import SiteServicesBlock from '../../../components/SiteServicesBlock/SiteServicesBlock';
import TransactionsBlock from '../../../components/TransactionsBlock/TransactionsBlock';

import styles from './SettingsServicesAndFinances.module.css';

/**
 * Страница финансов и оплаченных сервисов.
 */
export default function SettingsServicesAndFinances() {
  useTitle('Финансы и Сервисы');
  const { siteServices, purchasableSiteServices } = useSelector((state) => state.siteServices);
  const { paymentTransactions } = useSelector((state) => state.paymentNotifications);
  const { user } = useSelector((state) => state.checkAuth.value);

  useServicesAndFinances(user.id);

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
        {paymentTransactions.length > 0 ? (
          <TransactionsBlock transactions={paymentTransactions} />
        ) : (
          <div className={styles.wrapper__block}>
            <div>Нет транзакций</div>
          </div>
        )}
      </div>
    </div>
  );
}
