import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useAd } from '../../hook/useAd';
import OrganizerHeader from '../../components/OrganizerHeader/OrganizerHeader';
import { useResize } from '../../hook/use-resize';
import { HelmetOrganizerPublic } from '../../components/Helmets/HelmetOrganizerPublic';
import { fetchOrganizerPublic } from '../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizerPublic } from '../../redux/features/api/organizer_public/organizersPublicSlice';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import AdMyPage from '../../components/AdMyPage/AdMyPage';

import styles from './Organizer.module.css';

// Рекламные блоки на странице.
const adOverFooter = 8;
const adUnderHeader = 3;
const adNumbers = [adOverFooter, adUnderHeader];

/**
 * Страница Организатора заездов.
 */
function OrganizerPublic() {
  const { isScreenLg: isDesktop, isScreenXl: xl } = useResize();
  const { urlSlug } = useParams();

  // Данные организатора из хранилища редакс.
  const { organizer } = useSelector((state) => state.organizersPublic);

  useTitle(`Организатор ${organizer?.name || ''}`);

  const dispatch = useDispatch();

  // Запрос на получение списка организаторов.
  useEffect(() => {
    dispatch(fetchOrganizerPublic({ urlSlug }));

    return () => dispatch(resetOrganizerPublic());
  }, []);

  useAd(adNumbers);
  return (
    <>
      <HelmetOrganizerPublic name={organizer.name} imageSrc={organizer.posterSrc} />

      <div className={styles.wrapper}>
        {!organizer?._id ? <OrganizerHeader organizer={organizer} /> : <div></div>}

        {/* Боковая панель. */}
        {xl && (
          <aside className={styles.aside}>
            <AdMyPage
              href="/race/series/catchup/2024"
              title="Догонялки (Catchup)"
              subtitle="сезон 2024-2025"
              imageSrc="/images/open_graph/5.jpg"
            />
          </aside>
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

export default OrganizerPublic;
