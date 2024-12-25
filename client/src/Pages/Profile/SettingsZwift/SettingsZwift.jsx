import { useSelector } from 'react-redux';

import ProfileSettingsZwift from '../../../components/ProfileSettingsZwift/ProfileSettingsZwift';
import useTitle from '../../../hook/useTitle';

/**
 * Страница привязки основного и дополнительных аккаунтов из Звифта к аккаунту сайта.
 */
export default function SettingsZwift() {
  useTitle('Привязка аккаунтов из Zwift');

  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);
  return <ProfileSettingsZwift zwiftIdAuth={zwiftIdAuth} />;
}
