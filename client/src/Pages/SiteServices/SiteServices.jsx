import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchSiteServicePrice } from '../../redux/features/api/site_service_price/fetchSiteServicePrice';
import Price from '../../components/Price/Price';
import useTitle from '../../hook/useTitle';
import { resetSiteServicePrice } from '../../redux/features/api/site_service_price/siteServicePriceSlice';

import styles from './SiteServices.module.css';

/**
 * Страница платных сервисов на сайте.
 */
export default function SiteServices() {
  useTitle('Сервисы на сайте');
  const { siteServicePrice } = useSelector((state) => state.siteServicePrice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSiteServicePrice());

    return () => dispatch(resetSiteServicePrice());
  }, []);

  return (
    <div className={styles.wrapper}>
      <Price services={siteServicePrice} />

      <div className={styles.support}>
        <span>По всем вопросам обращайтесь</span>
        <a
          href="mailto:support@zwiftpower.ru"
          className={'link'}
          aria-label="Написать в поддержку"
        >
          support@zwiftpower.ru
        </a>
      </div>
    </div>
  );
}
