import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAd } from '../../hook/useAd';
import { useResize } from '../../hook/use-resize';
import { HelmetCatchup } from '../../components/Helmets/HelmetCatchup';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import CardOrganizer from '../../components/CardOrganizer/CardOrganizer';

import styles from './Organizers.module.css';

// Рекламные блоки на странице.
const adOverFooter = 8;
const adUnderHeader = 3;
const adNumbers = [adOverFooter, adUnderHeader];

const propsCardTest = {
  name: 'Bike-Caucasus',
  logo: '/images/BigB.png',
  background: 'http://localhost/images/2025-01-15_17-37-19_4.jpg',
};

/**
 * Страница Организаторов заездов.
 */
function Organizers() {
  const { isScreenLg: isDesktop } = useResize();

  useTitle('Организаторы заездов');

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  useAd(adNumbers);
  return (
    <>
      <HelmetCatchup />
      <div className={styles.wrapper}>
        {isDesktop ? (
          <AdContainer number={adUnderHeader} height={180} marginBottom={10} />
        ) : null}

        <section className={styles.cards}>
          <CardOrganizer {...propsCardTest} />
          <CardOrganizer {...propsCardTest} />
          <CardOrganizer {...propsCardTest} />
        </section>
      </div>

      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )}
    </>
  );
}

export default Organizers;
