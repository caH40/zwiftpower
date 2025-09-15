import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

// import { useAd } from '../../hook/useAd';
import { useResize } from '../../hook/use-resize';
import { HelmetOrganizerPublic } from '../../components/Helmets/HelmetOrganizerPublic';
import { fetchOrganizerPublic } from '../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizerPublic } from '../../redux/features/api/organizer_public/organizersPublicSlice';
// import AdContainer from '../../components/AdContainer/AdContainer';
import AdSeries from '../../components/AdSeries/AdSeries';
import OrganizerHeader from '../../components/OrganizerHeader/OrganizerHeader';

import NavBarOrganizerPublic from '../../components/UI/NavBarOrganizerPublic/NavBarOrganizerPublic';

import styles from './OrganizerPublicLayout.module.css';

// Рекламные блоки на странице.
// const adOverFooter = 22;
// const adUnderHeader = 23;
// const adNumbers = [adOverFooter, adUnderHeader];

/**
 * Страница Организатора заездов.
 */
export default function OrganizerPublicLayout() {
  const { isScreenXl: xl, isScreenLg: isDesktop } = useResize();
  const { urlSlug } = useParams();

  // Данные организатора из хранилища редакс.
  const { organizer } = useSelector((state) => state.organizersPublic);

  const dispatch = useDispatch();

  // Запрос на получение организатора с urlSlug.
  useEffect(() => {
    dispatch(fetchOrganizerPublic({ urlSlug }));

    return () => dispatch(resetOrganizerPublic());
  }, []);

  // useAd(adNumbers);
  return (
    <>
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

            <Suspense>
              <Outlet />
            </Suspense>
          </section>
        ) : (
          <div></div>
        )}

        {/* Боковая панель. */}
        {xl && (
          <aside className={styles.aside}>
            {/* Рекламный блок Серии догонялок */}
            <AdSeries
              urlSlug={'kom-on-dogonyalki-po-sredam'}
              isCard={true}
              pageType="schedule"
            />
          </aside>
        )}
      </div>

      {/* <AdContainer number={adOverFooter} maxWidth={1105} /> */}
    </>
  );
}
