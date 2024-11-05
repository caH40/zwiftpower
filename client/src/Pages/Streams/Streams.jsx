import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HelmetStreams } from '../../components/Helmets/HelmetStreams';
import TwitchStreamBlock from '../../components/Streams/TwitchStreamBlock/TwitchStreamBlock';
import useTitle from '../../hook/useTitle';
import { fetchUsersEnabledStreams } from '../../redux/features/api/streams/fetchUsersEnabledStreams';

import styles from './Streams.module.css';

/**
 * Страница Трансляций (стримов) с звифта пользователей сайта.
 */
export default function Streams() {
  const { streams } = useSelector((state) => state.usersEnabledStreams);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersEnabledStreams());
  }, []);

  useTitle('Трансляции с Zwift');
  return (
    <div>
      <HelmetStreams />

      <div className={styles.wrapper__streams}>
        {!!streams.length &&
          streams.map((stream) => <TwitchStreamBlock stream={stream} key={stream._id} />)}
      </div>
    </div>
  );
}
