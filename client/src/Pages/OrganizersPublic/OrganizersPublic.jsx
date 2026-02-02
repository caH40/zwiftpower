import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ORGANIZERS_HELMET_PROPS } from '../../assets/helmet-props';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { shuffleArray } from '../../utils/shuffle';
import { fetchOrganizersPublic } from '../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizersPublic } from '../../redux/features/api/organizer_public/organizersPublicSlice';
import { SkeletonOrganizerCard } from '../../components/SkeletonLoading/SkeletonOrganizerCard/SkeletonOrganizerCard';
import { renderSkeletonCards } from '../../utils/skeleton-cards';
import useTitle from '../../hook/useTitle';
import CardOrganizer from '../../components/CardOrganizer/CardOrganizer';

import styles from './OrganizersPublic.module.css';

/**
 * Страница Организаторов заездов.
 */
function OrganizersPublic() {
  useTitle('Организаторы заездов');

  // Данные организаторов из хранилища редакс.
  const { organizers, status: fetchOrganizersStatus } = useSelector(
    (state) => state.organizersPublic
  );

  // Случайная перестановка организаторов в массиве для изменения последовательности отображения карточек Организаторов.
  const shuffledOrganizers = useMemo(() => {
    return shuffleArray(organizers);
  }, [organizers]);

  const dispatch = useDispatch();

  // Запрос на получение списка организаторов.
  useEffect(() => {
    dispatch(fetchOrganizersPublic());

    return () => dispatch(resetOrganizersPublic());
  }, [dispatch]);

  return (
    <>
      <HelmetComponent {...ORGANIZERS_HELMET_PROPS.ORGANIZERS_PUBLIC} />
      <div className={styles.wrapper}>
        <section className={styles.cards}>
          {renderSkeletonCards({
            count: 5,
            SkeletonComponent: SkeletonOrganizerCard,
            status: fetchOrganizersStatus,
          })}

          {shuffledOrganizers?.map((organizer) => (
            <CardOrganizer
              name={organizer.name}
              urlSlug={organizer.urlSlug}
              logoUrls={organizer.logoUrls}
              posterUrls={organizer.posterUrls}
              key={organizer.id}
            />
          ))}
        </section>
      </div>
    </>
  );
}

export default OrganizersPublic;
