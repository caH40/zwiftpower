import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import { HelmetOrganizerPublic } from '../../components/Helmets/HelmetOrganizerPublic';
import { fetchOrganizerPublic } from '../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizerPublic } from '../../redux/features/api/organizer_public/organizersPublicSlice';
import AdSeries from '../../components/AdSeries/AdSeries';
import OrganizerHeader from '../../components/OrganizerHeader/OrganizerHeader';
import { fetchGetOngoingSeries } from '../../redux/features/api/series/fetchSeries';
import NavBarOrganizerPublic from '../../components/UI/NavBarOrganizerPublic/NavBarOrganizerPublic';
import SkeletonSeriesAd from '../../components/SkeletonLoading/SkeletonSeriesAd/SkeletonSeriesAd';
import { renderSkeletonCards } from '../../utils/skeleton-cards';
import { LoadingPage } from '../LoadingPage/LoadingPage';

import styles from './OrganizerPublicLayout.module.css';

/**
 * Страница Организатора заездов.
 */
export default function OrganizerPublicLayout() {
  const { ongoingSeriesPublic, status: fetchSeriesStatus } = useSelector(
    (state) => state.seriesPublic
  );
  const { urlSlug } = useParams();

  // Данные организатора из хранилища редакс.
  const { organizer } = useSelector((state) => state.organizersPublic);

  const dispatch = useDispatch();

  // Запрос на получение организатора с urlSlug.
  useEffect(() => {
    dispatch(fetchOrganizerPublic({ urlSlug }));

    return () => dispatch(resetOrganizerPublic());
  }, [dispatch, urlSlug]);

  useEffect(() => {
    dispatch(fetchGetOngoingSeries());
  }, [dispatch]);

  return (
    <>
      <HelmetOrganizerPublic />

      <div className={styles.wrapper}>
        {organizer?.posterUrls?.original ? (
          // Основная секция страницы
          <section className={styles.main}>
            {/* Блок-шапка с данными Организатора */}
            <div className={styles.spacer__header}>
              <OrganizerHeader organizer={organizer} />
            </div>

            {/* Кнопки навигации по страницам организатора */}

            <div className={styles.box__navbar}>
              <NavBarOrganizerPublic urlSlug={organizer.urlSlug} />
            </div>

            <Suspense fallback={<LoadingPage />}>
              <Outlet />
            </Suspense>
          </section>
        ) : (
          <div></div>
        )}

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
