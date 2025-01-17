import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useAd } from '../../hook/useAd';
import { useResize } from '../../hook/use-resize';
import { HelmetCatchup } from '../../components/Helmets/HelmetCatchup';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';

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
  const { organizerName } = useParams();

  useTitle(`Организатор заездов ${organizerName}`);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  useAd(adNumbers);
  return (
    <>
      <HelmetCatchup />
      <div className={styles.wrapper}>
        {isDesktop ? (
          <AdContainer number={adUnderHeader} height={180} marginBottom={10} />
        ) : null}
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
