import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HelmetStreams } from '../../components/Helmets/HelmetStreams';
import TwitchStream from '../../components/Streams/TwitchStream/TwitchStream';
import useTitle from '../../hook/useTitle';
import { fetchUsersEnabledStreams } from '../../redux/features/api/streams/fetchUsersEnabledStreams';

import styles from './Streams.module.css';

/**
 * Страница Трансляций (стримов) с звифта пользователей сайта.
 */
export default function Streams() {
  const { streams } = useSelector((state) => state.usersEnabledStreams);

  const dispatch = useDispatch();

  console.log(streams);

  useEffect(() => {
    dispatch(fetchUsersEnabledStreams());
  }, []);

  useTitle('Трансляции с Zwift');
  return (
    <div>
      <HelmetStreams />

      {!!streams.length &&
        streams.map((stream) => (
          <TwitchStream channel={stream.twitch.channelName} key={stream._id} />
        ))}
    </div>
  );
}
