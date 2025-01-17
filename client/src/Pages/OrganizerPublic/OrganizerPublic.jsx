import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useAd } from '../../hook/useAd';
import { useResize } from '../../hook/use-resize';
import { HelmetCatchup } from '../../components/Helmets/HelmetCatchup';
import { fetchOrganizerPublic } from '../../redux/features/api/organizer_public/fetchOrganizersPublic';
import { resetOrganizerPublic } from '../../redux/features/api/organizer_public/organizersPublicSlice';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import JSONBlock from '../../components/JSONBlock/JSONBlock';

import styles from './Organizers.module.css';

// Рекламные блоки на странице.
const adOverFooter = 8;
const adUnderHeader = 3;
const adNumbers = [adOverFooter, adUnderHeader];

/**
 * Страница Организатора заездов.
 */
function OrganizerPublic() {
  const { isScreenLg: isDesktop } = useResize();
  const { urlSlug } = useParams();

  // Данные организатора из хранилища редакс.
  const { organizer } = useSelector((state) => state.organizersPublic);

  useTitle(`Организатор заездов ${organizer?.name || ''}`);

  const dispatch = useDispatch();

  // Запрос на получение списка организаторов.
  useEffect(() => {
    dispatch(fetchOrganizerPublic({ urlSlug }));

    return () => dispatch(resetOrganizerPublic());
  }, []);

  useAd(adNumbers);
  return (
    <>
      <HelmetCatchup />
      <div className={styles.wrapper}>
        {isDesktop ? (
          <AdContainer number={adUnderHeader} height={180} marginBottom={10} />
        ) : null}

        <JSONBlock json={organizer} />
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
