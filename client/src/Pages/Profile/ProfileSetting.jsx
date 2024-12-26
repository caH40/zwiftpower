import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserSettings } from '../../redux/features/api/user-settings/fetchUserSettings';
import { resetUserSettings } from '../../redux/features/api/user-settings/userSettingsSlice';
import NavBarProfileSettings from '../../components/UI/NavBarProfileSettings/NavBarProfileSettings';

import styles from './ProfileSetting.module.css';

function ProfileSetting() {
  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);
  const { zwiftId: zwiftIdPage } = useParams();

  const dispatch = useDispatch();

  // Запрос настроек в профиле, таких как Оповещения и т.д
  useEffect(() => {
    if (zwiftIdAuth !== undefined) {
      dispatch(fetchUserSettings({ zwiftId: zwiftIdAuth }));
    }

    return () => {
      dispatch(resetUserSettings());
    };
  }, []);

  // Не отображать страницу настроек для чужого пользователя..
  const isOtherUser = +zwiftIdPage !== zwiftIdAuth && +zwiftIdPage !== 0;
  if (isOtherUser) {
    return <p>Вы не можете просматривать настройки другого пользователя.</p>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.spacer}>
        <NavBarProfileSettings zwiftId={zwiftIdPage} />
      </div>
      <Outlet zwiftIdAuth={zwiftIdAuth} />
    </section>
  );
}

export default ProfileSetting;
