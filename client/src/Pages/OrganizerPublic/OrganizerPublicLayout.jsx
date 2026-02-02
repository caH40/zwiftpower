import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import { HelmetOrganizerPublic } from '../../components/Helmets/HelmetOrganizerPublic';
import { fetchOrganizerPublic } from '../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizerPublic } from '../../redux/features/api/organizer_public/organizersPublicSlice';
import OrganizerHeader from '../../components/OrganizerHeader/OrganizerHeader';
import NavBarOrganizerPublic from '../../components/UI/NavBarOrganizerPublic/NavBarOrganizerPublic';
import { LoadingPage } from '../LoadingPage/LoadingPage';

import styles from './OrganizerPublicLayout.module.css';

/**
 * Страница Организатора заездов.
 */
export default function OrganizerPublicLayout() {
  const { urlSlug } = useParams();

  // Данные организатора из хранилища редакс.
  const { organizer } = useSelector((state) => state.organizersPublic);

  const dispatch = useDispatch();

  // Запрос на получение организатора с urlSlug.
  useEffect(() => {
    dispatch(fetchOrganizerPublic({ urlSlug }));

    return () => dispatch(resetOrganizerPublic());
  }, [dispatch, urlSlug]);

  return (
    <>
      <HelmetOrganizerPublic />

      <div className={styles.wrapper}>
        {/* Основная секция страницы */}
        <section className={styles.main}>
          <>
            {/* Блок-шапка с данными Организатора */}
            <div className={styles.spacer__header}>
              <OrganizerHeader organizer={organizer} />
            </div>
            {/* Кнопки навигации по страницам организатора */}
            <div className={styles.box__navbar}>
              <NavBarOrganizerPublic urlSlug={organizer?.urlSlug} />
            </div>
            <Suspense fallback={<LoadingPage />}>
              <Outlet />
            </Suspense>
          </>
        </section>
      </div>
    </>
  );
}
