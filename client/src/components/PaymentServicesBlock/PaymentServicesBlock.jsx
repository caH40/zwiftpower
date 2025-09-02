import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useOrganizerPurchase } from '../../hook/useOrganizerPurchase';
import { siteServicesList } from '../../assets/options';
import { serverFront } from '../../config/environment';
import Button from '../UI/Button/Button';
import SimpleSelectFunction from '../UI/SimpleSelect/SimpleSelectFunction';
import SiteService from '../SiteService/SiteService';

import styles from './PaymentServicesBlock.module.css';

/**
 * Блок оплаты сервисов.
 */
export default function PaymentServicesBlock({ services, user }) {
  const options = siteServicesList(services);
  const [selectedService, setSelectedService] = useState(options[0].name);

  const location = useLocation();

  const service = services.find((s) => s.entityName === selectedService);

  const { handleClickPurchase } = useOrganizerPurchase({
    returnUrl: `${serverFront}${location.pathname}`,
    payloadData: {
      value: service.amount.value,
      currency: service.amount.currency,
      customer: { full_name: user.username },
    },
    userId: user.id,
  });

  return (
    <div className={styles.block}>
      <SimpleSelectFunction
        closeEmptyOption={true}
        name={'Выберите сервис'}
        options={options}
        value={selectedService}
        reducer={setSelectedService}
      />

      <div className={styles.wrapper__info}>
        {!!service && <SiteService service={service} />}
      </div>

      <div className={styles.actions}>
        <Button getClick={handleClickPurchase}>Оплатить</Button>
      </div>
    </div>
  );
}
