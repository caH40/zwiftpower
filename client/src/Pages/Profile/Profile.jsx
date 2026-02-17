import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import cn from 'classnames/bind';

import useTitle from '../../hook/useTitle';
import NavBarProfile from '../../components/UI/NavBarProfile/NavBarProfile';
import ProfileBlock from '../../components/ProfileBlock/ProfileBlock';
import { fetchUserProfile, resetUserProfile } from '../../redux/features/api/userProfileSlice';
import SkeletonProfileBlock from '../../components/SkeletonLoading/SkeletonProfileBlock/SkeletonProfileBlock';

import styles from './Profile.module.css';

const cx = cn.bind(styles);

/**
 * Лэйаут для страниц профиля с блоком изображения и основных данных райдера.
 */
function Profile() {
  useTitle('Профиль пользователя');
  // const { isScreenLg: isDesktop } = useResize();
  const {
    profile,
    quantityRace,
    streamsEnabled,
    status: statusProfile,
  } = useSelector((state) => state.fetchUserProfile);
  const [source, setSource] = useState('');
  const [showEnlargeLogo, setShowEnlargeLogo] = useState(false);
  const userAuth = useSelector((state) => state.checkAuth.value);
  const { zwiftId } = useParams();

  const dispatch = useDispatch();

  // useAd(adNumbers);

  // Получение данных профиля райдера с сервера.
  useEffect(() => {
    dispatch(fetchUserProfile({ zwiftId }));

    return () => dispatch(resetUserProfile());
  }, [dispatch, userAuth, zwiftId]);

  // увеличение размера лого райдера
  const enlargeLogo = (src) => {
    setShowEnlargeLogo(true);
    setSource(src);
  };

  return (
    <>
      <section className={styles.wrapper}>
        {/* отображение увеличенного лого райдера */}
        <Transition in={showEnlargeLogo} unmountOnExit timeout={250}>
          {(state) => (
            <div className={cx('modal', state)} onClick={() => setShowEnlargeLogo(false)}>
              <img src={source} alt="Large Logo" className={styles.logo__large} />
            </div>
          )}
        </Transition>

        <NavBarProfile zwiftId={+zwiftId} addCls={'mb15'} />

        {/* Блок профиля: изображение и основные данные райдера */}
        <SkeletonProfileBlock status={statusProfile} />

        {statusProfile === 'resolved' && (
          <ProfileBlock
            profile={profile}
            enlargeLogo={enlargeLogo}
            streamsEnabled={streamsEnabled}
            quantityRace={quantityRace || 0}
          />
        )}

        <Outlet />
      </section>
    </>
  );
}
export default Profile;
