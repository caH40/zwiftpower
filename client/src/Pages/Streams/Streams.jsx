import { HelmetStreams } from '../../components/Helmets/HelmetStreams';
import TwitchStream from '../../components/Streams/TwitchStream/TwitchStream';
import useTitle from '../../hook/useTitle';

import styles from './Streams.module.css';

/**
 * Страница Трансляций (стримов) с звифта пользователей сайта.
 */
export default function Streams() {
  useTitle('Трансляции с Zwift');
  return (
    <div>
      <HelmetStreams />
      <TwitchStream channel={'komonrace'} />
    </div>
  );
}
