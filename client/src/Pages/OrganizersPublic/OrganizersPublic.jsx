import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAd } from '../../hook/useAd';
import { useResize } from '../../hook/use-resize';
import { HelmetCatchup } from '../../components/Helmets/HelmetCatchup';
import { fetchOrganizersPublic } from '../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizersPublic } from '../../redux/features/api/organizer_public/organizersPublicSlice';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import CardOrganizer from '../../components/CardOrganizer/CardOrganizer';

import styles from './OrganizersPublic.module.css';

// Рекламные блоки на странице.
const adOverFooter = 8;
const adUnderHeader = 3;
const adNumbers = [adOverFooter, adUnderHeader];

/**
 * Страница Организаторов заездов.
 */
function OrganizersPublic() {
  const { isScreenLg: isDesktop } = useResize();
  useTitle('Организаторы заездов');

  // Данные организаторов из хранилища редакс.
  const { organizers } = useSelector((state) => state.organizersPublic);

  const dispatch = useDispatch();

  // Запрос на получение списка организаторов.
  useEffect(() => {
    dispatch(fetchOrganizersPublic());

    return () => dispatch(resetOrganizersPublic());
  }, []);

  // Хук работы с рекламными блоками на странице.
  useAd(adNumbers);
  return (
    <>
      <HelmetCatchup />
      <div className={styles.wrapper}>
        {isDesktop ? (
          <AdContainer number={adUnderHeader} height={180} marginBottom={10} />
        ) : null}

        {!!organizers?.length && (
          <section className={styles.cards}>
            {organizers.map((organizer) => (
              <CardOrganizer
                name={organizer.name}
                logoSrc={organizer.logoSrc}
                backgroundSrc={organizer.backgroundImage}
                key={organizer.id}
              />
            ))}
          </section>
        )}
      </div>

      {isDesktop ? (
        <AdContainer number={adOverFooter} maxWidth={1105} />
      ) : (
        <AdContainer number={adUnderHeader} />
      )}
    </>
  );
}

export default OrganizersPublic;
