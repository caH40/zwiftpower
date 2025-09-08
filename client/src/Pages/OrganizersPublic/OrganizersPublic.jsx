import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { useAd } from '../../hook/useAd';
import { helmetProps } from '../../assets/helmet-props';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { shuffleArray } from '../../utils/shuffle';
import { useResize } from '../../hook/use-resize';
import { fetchOrganizersPublic } from '../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizersPublic } from '../../redux/features/api/organizer_public/organizersPublicSlice';
// import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import CardOrganizer from '../../components/CardOrganizer/CardOrganizer';

import styles from './OrganizersPublic.module.css';

// Рекламные блоки на странице.
// const adOverFooter = 22;
// const adUnderHeader = 23;
// const adNumbers = [adOverFooter, adUnderHeader];

/**
 * Страница Организаторов заездов.
 */
function OrganizersPublic() {
  const { isScreenLg: isDesktop } = useResize();
  useTitle('Организаторы заездов');

  // Данные организаторов из хранилища редакс.
  const { organizers } = useSelector((state) => state.organizersPublic);

  // Случайная перестановка организаторов в массиве для изменения последовательности отображения карточек Организаторов.
  const shuffledOrganizers = useMemo(() => {
    return shuffleArray(organizers);
  }, [organizers]);

  const dispatch = useDispatch();

  // Запрос на получение списка организаторов.
  useEffect(() => {
    dispatch(fetchOrganizersPublic());

    return () => dispatch(resetOrganizersPublic());
  }, []);

  // Хук работы с рекламными блоками на странице.
  // useAd(adNumbers);
  return (
    <>
      <HelmetComponent {...helmetProps.ORGANIZERS_PUBLIC} />
      <div className={styles.wrapper}>
        {!!shuffledOrganizers?.length && (
          <section className={styles.cards}>
            {shuffledOrganizers.map((organizer) => (
              <CardOrganizer
                name={organizer.name}
                urlSlug={organizer.urlSlug}
                logoUrls={organizer.logoUrls}
                posterUrls={organizer.posterUrls}
                key={organizer.id}
              />
            ))}
          </section>
        )}
      </div>

      {/* <AdContainer number={adOverFooter} maxWidth={1105} /> */}
    </>
  );
}

export default OrganizersPublic;
