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

  return (
    <>
      <section className={styles.wrapper}>
        {isDesktop && <AdContainer number={adUnderHeader} height={180} marginBottom={10} />}
        <NavBarProfile zwiftId={+zwiftId} addCls={'mb15'} />
        <Outlet />
      </section>
      {!isDesktop && <AdContainer number={adUnderHeader} />}
    </>
  );
}
export default Profile;
