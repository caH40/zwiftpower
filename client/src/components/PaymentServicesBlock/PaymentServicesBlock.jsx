import { useState } from 'react';

import { useOrganizerPurchase } from '../../hook/useOrganizerPurchase';
import { siteServicesList } from '../../assets/options';
import Button from '../UI/Button/Button';
import SimpleSelectFunction from '../UI/SimpleSelect/SimpleSelectFunction';
import SiteService from '../SiteService/SiteService';

import styles from './PaymentServicesBlock.module.css';

/**
 * Блок оплаты сервисов.
 */
export default function PaymentServicesBlock({ services }) {
  const options = siteServicesList(services);
  const [selectedService, setSelectedService] = useState(options[0].name);

  const service = services.find((s) => s.entityName === selectedService);

  const { handleClickPurchase } = useOrganizerPurchase();

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
