import { Outlet, useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import NavBarProfile from '../../components/UI/NavBarProfile/NavBarProfile';
import { useAd } from '../../hook/useAd';
import AdContainer from '../../components/AdContainer/AdContainer';

import styles from './Profile.module.css';

// рекламные блоки на странице
const adOverFooter = 4;
const adNumbers = [adOverFooter];

function Profile() {
  useTitle('Профиль пользователя');

  const { zwiftId } = useParams();

  useAd(adNumbers);

  return (
    <>
      <section className={styles.wrapper}>
        <NavBarProfile zwiftId={+zwiftId} addCls={'mb15'} />
        <Outlet />
      </section>
      <AdContainer number={adOverFooter} />
    </>
  );
}
export default Profile;
