import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import { useAd } from '../../hook/useAd';
import OrganizerHeader from '../../components/OrganizerHeader/OrganizerHeader';
import { useResize } from '../../hook/use-resize';
import { HelmetOrganizerPublic } from '../../components/Helmets/HelmetOrganizerPublic';
import { fetchOrganizerPublic } from '../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizerPublic } from '../../redux/features/api/organizer_public/organizersPublicSlice';
import AdContainer from '../../components/AdContainer/AdContainer';
import AdMyPage from '../../components/AdMyPage/AdMyPage';
import NavBarOrganizerPublic from '../../components/UI/NavBarOrganizerPublic/NavBarOrganizerPublic';

import styles from './OrganizerPublicLayout.module.css';

// Рекламные блоки на странице.
const adOverFooter = 22;
const adNumbers = [adOverFooter];

/**
 * Страница Организатора заездов.
 */
export default function OrganizerPublicLayout() {
  const { isScreenXl: xl } = useResize();
  const { urlSlug } = useParams();

  // Данные организатора из хранилища редакс.
  const { organizer } = useSelector((state) => state.organizersPublic);

  const dispatch = useDispatch();

  // Запрос на получение организатора с urlSlug.
  useEffect(() => {
    dispatch(fetchOrganizerPublic({ urlSlug }));

    return () => dispatch(resetOrganizerPublic());
  }, []);

  useAd(adNumbers);
  return (
    <>
      <HelmetOrganizerPublic
        urlSlug={organizer.urlSlug}
        name={organizer.name}
        imageSrc={organizer.posterUrls?.medium}
      />

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

            <Outlet />
          </section>
        ) : (
          <div></div>
        )}

        {/* Боковая панель. */}
        {xl && (
          <aside className={styles.aside}>
            <AdMyPage
              href="/series"
              title="Догонялки (Catchup)"
              subtitle="сезон 2024-2025"
              imageSrc="/images/open_graph/5.jpg"
            />
          </aside>
        )}
      </div>

      <AdContainer number={adOverFooter} maxWidth={1105} />
    </>
  );
}
