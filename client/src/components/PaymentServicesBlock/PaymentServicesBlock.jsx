import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '../UI/Button/Button';
import SimpleSelectFunction from '../UI/SimpleSelect/SimpleSelectFunction';
import { useOrganizerPurchase } from '../../hook/useOrganizerPurchase';
import { siteServicesList } from '../../assets/options';
import { serverFront } from '../../config/environment';

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
      unitPrice: service.price.unitPrice,
      currency: service.price.currency,
      customer: { full_name: user.username },
    },
    userId: user.id,
  });

  // Форматирование дат
  const startDate = service ? new Date(service.startDate).toLocaleDateString() : '';
  const endDate = service ? new Date(service.endDate).toLocaleDateString() : '';

  return (
    <div className={styles.block}>
      <SimpleSelectFunction
        name={'Выберите сервис'}
        options={options}
        value={selectedService}
        reducer={setSelectedService}
      />

      <div className={styles.wrapper__info}>
        {!!service && (
          <dl className={styles.list}>
            <dt>Описание</dt>
            <dd className={styles.description}>{service.description}</dd>

            <dt>Срок действия</dt>
            <dd className={styles.dates}>
              {startDate} — {endDate}
            </dd>

            <dt>Цена</dt>
            <dd className={styles.dates}>
              {service.price.unitPrice} {service.price.currency}
            </dd>
          </dl>
        )}
      </div>

      <div className={styles.actions}>
        <Button getClick={handleClickPurchase}>Оплатить</Button>
      </div>
    </div>
  );
}
