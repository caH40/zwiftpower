import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import { useResize } from '../../hook/use-resize';
import NavBarProfile from '../../components/UI/NavBarProfile/NavBarProfile';
import { useAd } from '../../hook/useAd';
import AdContainer from '../../components/AdContainer/AdContainer';

import styles from './Profile.module.css';

// рекламные блоки на странице
const adUnderHeader = 14;
const adNumbers = [adUnderHeader];

function Profile() {
  useTitle('Профиль пользователя');
  const { isScreenLg: isDesktop } = useResize();

  const { zwiftId } = useParams();

  useAd(adNumbers);
  useEffect(() => {
    (window.MRGtag || []).push({});
  }, []);

  useAd(adNumbers);

  return (
    <>
      <section className={styles.wrapper}>
        <ins
          className="mrg-tag"
          style={{ display: 'inline-block', width: 320, height: 100 }}
          data-ad-client="ad-1498490"
          data-ad-slot="1498490"
        ></ins>

        {isDesktop && <AdContainer number={adUnderHeader} height={150} marginBottom={10} />}
        <NavBarProfile zwiftId={+zwiftId} addCls={'mb15'} />
        <Outlet />
      </section>
      {!isDesktop && <AdContainer number={adUnderHeader} />}
    </>
  );
}
export default Profile;
