import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ORGANIZERS_HELMET_PROPS } from '../../assets/helmet-props';
import { HelmetComponent } from '../../components/Helmets/HelmetComponent';
import { shuffleArray } from '../../utils/shuffle';
import { fetchOrganizersPublic } from '../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizersPublic } from '../../redux/features/api/organizer_public/organizersPublicSlice';
import useTitle from '../../hook/useTitle';
import CardOrganizer from '../../components/CardOrganizer/CardOrganizer';
import { fetchGetOngoingSeries } from '../../redux/features/api/series/fetchSeries';
import { renderSkeletonCards } from '../../utils/skeleton-cards';
import SkeletonSeriesAd from '../../components/SkeletonLoading/SkeletonSeriesAd/SkeletonSeriesAd';
import AdSeries from '../../components/AdSeries/AdSeries';

import styles from './OrganizersPublic.module.css';

/**
 * Страница Организаторов заездов.
 */
function OrganizersPublic() {
  useTitle('Организаторы заездов');

  // Данные организаторов из хранилища редакс.
  const { organizers } = useSelector((state) => state.organizersPublic);
  const { ongoingSeriesPublic, status: fetchSeriesStatus } = useSelector(
    (state) => state.seriesPublic
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

  useEffect(() => {
    dispatch(fetchGetOngoingSeries());
  }, [dispatch]);

  return (
    <>
      <HelmetComponent {...ORGANIZERS_HELMET_PROPS.ORGANIZERS_PUBLIC} />
      <div className={styles.wrapper}>
        <section className={styles.cards}>
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

        {/* Боковая панель. */}
        <aside className={styles.aside}>
          {!ongoingSeriesPublic.length
            ? renderSkeletonCards({
                count: 4,
                SkeletonComponent: SkeletonSeriesAd,
                status: fetchSeriesStatus,
              })
            : null}

          {/* Рекламный блок текущих Серий */}
          {ongoingSeriesPublic.map((s) => (
            <AdSeries
              key={s.urlSlug}
              urlSlug={s.urlSlug}
              posterUrls={s.posterUrls}
              name={s.name}
              dateStart={s.dateStart}
              dateEnd={s.dateEnd}
              isCard={true}
              pageType="schedule"
            />
          ))}
        </aside>
      </div>
    </>
  );
}

export default OrganizersPublic;
