import { useDispatch } from 'react-redux';

import { fetchProfileRefresh } from '../../redux/features/api/profileRefreshSlice';
import ProfileSettingsZwift from '../../components/ProfileSettingsZwift/ProfileSettingsZwift';
import IconRefresh from '../../components/icons/IconRefresh';

import styles from './ProfileSetting.module.css';

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
    </section>
  );
}

export default ProfileSetting;
