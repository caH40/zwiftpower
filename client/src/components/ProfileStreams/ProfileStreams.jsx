import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import StreamControl from '../StreamControl/StreamControl';

import styles from './ProfileStreams.module.css';

/**
 * Форма изменения настроек для трансляций.
 */
export default function ProfileStreams({ zwiftIdAuth }) {
  const { streams, status } = useSelector((state) => state.userSettings);

  const [channelNameTwitch, setChannelNameTwitch] = useState('');
  const [channelHandleYoutube, setChannelHandleYoutube] = useState('');

  // Устанавливаем начальное значение channelName после получения данных с сервера.
  useEffect(() => {
    if (streams?.twitch?.channelName) {
      setChannelNameTwitch(streams.twitch.channelName);
    }
    if (streams?.youtube?.channelHandle) {
      setChannelHandleYoutube(streams.youtube.channelHandle);
    }
  }, [streams.twitch?.channelName, streams.youtube?.channelHandle]);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Трансляции</h3>

      <div className={styles.wrapper__controls}>
        {/* Форма для Twitch */}
        <StreamControl
          platformName={'twitch'}
          channelName={channelNameTwitch}
          setChannelName={setChannelNameTwitch}
          zwiftIdAuth={zwiftIdAuth}
          isEnabled={streams.twitch?.isEnabled}
          iconSrc={'/images/glitch_flat_purple.svg'}
        />

        {/* Форма для Youtube */}
        <StreamControl
          platformName={'youtube'}
          channelName={channelHandleYoutube}
          setChannelName={setChannelHandleYoutube}
          zwiftIdAuth={zwiftIdAuth}
          isEnabled={streams.youtube?.isEnabled}
          iconSrc={'/images/youtube_icon.svg'}
        />
      </div>
    </div>
  );
}
