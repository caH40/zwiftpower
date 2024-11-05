import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProfileRefresh } from '../../redux/features/api/profileRefreshSlice';
import { fetchUserSettings } from '../../redux/features/api/user-settings/fetchUserSettings';
import { resetUserSettings } from '../../redux/features/api/user-settings/userSettingsSlice';
import ProfileStreams from '../../components/ProfileStreams/ProfileStreams';
import ProfileSettingsZwift from '../../components/ProfileSettingsZwift/ProfileSettingsZwift';
import ProfileNotification from '../../components/ProfileNotification/ProfileNotification';
import IconRefresh from '../../components/icons/IconRefresh';

import styles from './ProfileSetting.module.css';

const notificationsTest = { development: false, news: true, events: true };

function ProfileSetting() {
  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);
  const { zwiftId: zwiftIdPage } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (zwiftIdAuth !== undefined) {
      dispatch(fetchUserSettings({ zwiftId: zwiftIdAuth }));
    }

    return () => {
      dispatch(resetUserSettings());
    };
  }, []);

  const refreshProfile = () => {
    dispatch(fetchProfileRefresh());
  };

  // Не отображать страницу настроек для чужого пользователя..
  const isOtherUser = +zwiftIdPage !== zwiftIdAuth && +zwiftIdPage !== 0;
  if (isOtherUser) {
    return <p>Вы не можете просматривать настройки другого пользователя.</p>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__blocks}>
        <div className={styles.refresh}>
          <span>Обновить данные основного профиля</span>
          <IconRefresh getClick={refreshProfile} />
        </div>

        <ProfileSettingsZwift zwiftIdAuth={zwiftIdAuth} />

        {zwiftIdAuth && (
          <>
            <ProfileNotification notifications={notificationsTest} zwiftIdAuth={zwiftIdAuth} />

            <ProfileStreams zwiftIdAuth={zwiftIdAuth} />
          </>
        )}
      </div>
    </section>
  );
}

export default ProfileSetting;
