import { useDispatch } from 'react-redux';

import { fetchProfileRefresh } from '../../redux/features/api/profileRefreshSlice';
import ProfileSettingsZwift from '../../components/ProfileSettingsZwift/ProfileSettingsZwift';
import ProfileNotification from '../../components/ProfileNotification/ProfileNotification';
import IconRefresh from '../../components/icons/IconRefresh';

import styles from './ProfileSetting.module.css';

const notificationsTest = { development: false, news: true, events: true };

function ProfileSetting() {
  const dispatch = useDispatch();

  const refreshProfile = () => {
    dispatch(fetchProfileRefresh());
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.refresh}>
        <span>Обновить данные основного профиля</span>
        <IconRefresh getClick={refreshProfile} />
      </div>
      <ProfileSettingsZwift />
      <ProfileNotification notifications={notificationsTest} />
    </section>
  );
}

export default ProfileSetting;
