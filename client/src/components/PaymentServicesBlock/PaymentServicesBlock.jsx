import { useState } from 'react';

import Button from '../UI/Button/Button';
import SimpleSelectFunction from '../UI/SimpleSelect/SimpleSelectFunction';
import { siteServicesList } from '../../assets/options';

import styles from './PaymentServicesBlock.module.css';

const s = [
  {
    label: 'Доступ к сервису Организатор',
    entityName: 'organizer',
    description:
      'Доступ к сервисам Организатора, создания и редактирования заездов через ZwiftAPI. Подписка сроком на 31 день.',
    subscriptionDescription: 'Оплата подписки на месяц.',
    startDate: new Date().toISOString(),
    endDate: new Date(new Date().getTime() + 31 * 24 * 60 * 60 * 1000).toISOString(), // +31 день
  },
];

/**
 * Блок оплаты сервисов.
 */
export default function PaymentServicesBlock({ services }) {
  const options = siteServicesList(s);
  const [selectedService, setSelectedService] = useState(options[0].name);

  const handleBuy = () => {
    console.log('handleBuy', { selectedService });
  };

  const service = s.find((s) => s.name === selectedService);

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
