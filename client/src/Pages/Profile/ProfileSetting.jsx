import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProfileRefresh } from '../../redux/features/api/profileRefreshSlice';
import ProfileSettingsZwift from '../../components/ProfileSettingsZwift/ProfileSettingsZwift';
import ProfileNotification from '../../components/ProfileNotification/ProfileNotification';
import IconRefresh from '../../components/icons/IconRefresh';

import styles from './ProfileSetting.module.css';

const notificationsTest = { development: false, news: true, events: true };

function ProfileSetting() {
  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);
  const { zwiftId: zwiftIdPage } = useParams();

  // Не отображать страницу настроек для чужого пользователя.
  if (+zwiftIdPage !== zwiftIdAuth) {
    return <></>;
  }

  const dispatch = useDispatch();

  const refreshProfile = () => {
    dispatch(fetchProfileRefresh());
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__blocks}>
        <div className={styles.refresh}>
          <span>Обновить данные основного профиля</span>
          <IconRefresh getClick={refreshProfile} />
        </div>

        <ProfileSettingsZwift zwiftIdAuth={zwiftIdAuth} />
        <ProfileNotification notifications={notificationsTest} zwiftIdAuth={zwiftIdAuth} />
      </div>
    </section>
  );
}

export default ProfileSetting;
