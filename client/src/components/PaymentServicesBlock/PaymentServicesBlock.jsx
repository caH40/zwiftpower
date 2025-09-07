import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useOrganizerPurchase } from '../../hook/useOrganizerPurchase';
import { siteServicesList } from '../../assets/options';
import Button from '../UI/Button/Button';
import SimpleSelectFunction from '../UI/SimpleSelect/SimpleSelectFunction';
import SiteService from '../SiteService/SiteService';
import SimpleCheckbox from '../UI/SimpleCheckbox/SimpleCheckbox';

import styles from './PaymentServicesBlock.module.css';

/**
 * Блок оплаты сервисов.
 */
export default function PaymentServicesBlock({ services }) {
  const [isOfferRead, setIsOfferRead] = useState({ value: false });
  const options = siteServicesList(services);
  const [selectedService, setSelectedService] = useState(options[0].name);

  const service = services.find((s) => s.id === selectedService);

  const { handleClickPurchase } = useOrganizerPurchase({ planId: service.id });

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

      <div className={styles.offer}>
        <SimpleCheckbox property={'value'} state={isOfferRead} setState={setIsOfferRead} />
        <span>Я ознакомлен с</span>

        <Link to={'/legal/offer'} className={'link'} target="_blank">
          публичной офертой
        </Link>
      </div>

      <div className={styles.actions}>
        <Button getClick={handleClickPurchase} disabled={!isOfferRead.value}>
          Оплатить
        </Button>
      </div>
    </div>
  );
}
