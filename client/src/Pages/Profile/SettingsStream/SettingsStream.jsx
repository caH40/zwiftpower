import { useSelector } from 'react-redux';

import ProfileStreams from '../../../components/ProfileStreams/ProfileStreams';
import useTitle from '../../../hook/useTitle';

/**
 * Страница настройки трансляций заездов в Твиче и в Ютубе из Звифта.
 */
export default function SettingsStream() {
  useTitle('Настройка трансляций с Twitch и Youtube');

  const { zwiftId: zwiftIdAuth } = useSelector((state) => state.checkAuth.value.user);

  return <div>{zwiftIdAuth && <ProfileStreams zwiftIdAuth={zwiftIdAuth} />}</div>;
}
