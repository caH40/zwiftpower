import { useState } from 'react';

import Button from '../UI/Button/Button';
import SimpleSelectFunction from '../UI/SimpleSelect/SimpleSelectFunction';
import { siteServicesList } from '../../assets/options';

import styles from './PaymentServicesBlock.module.css';

/**
 * Блок оплаты сервисов.
 */
export default function PaymentServicesBlock({ services }) {
  const options = siteServicesList(services);
  const [selectedService, setSelectedService] = useState(options[0].name);

  const handleBuy = () => {
    console.log('handleBuy', { selectedService });
  };

  const service = services.find((s) => s.entityName === selectedService);

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
          <>
            <p className={styles.description}>{service.description}</p>

            <p className={styles.dates}>
              Срок действия: {startDate} — {endDate}
            </p>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <Button getClick={handleBuy}>Оплатить</Button>
      </div>
    </div>
  );
}
