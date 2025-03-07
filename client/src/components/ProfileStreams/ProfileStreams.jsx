import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import StreamControl from '../StreamControl/StreamControl';

import styles from './ProfileStreams.module.css';

/**
 * Форма изменения настроек для трансляций.
 */
export default function ProfileStreams({ zwiftIdAuth }) {
  const { streams } = useSelector((state) => state.userSettings);

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
      {/* Форма для Twitch */}
      <div className={styles.wrapper__block}>
        <StreamControl
          platformName={'twitch'}
          channelName={channelNameTwitch}
          setChannelName={setChannelNameTwitch}
          zwiftIdAuth={zwiftIdAuth}
          isEnabled={streams.twitch?.isEnabled || false}
          iconSrc={'/images/twitch_glitch_flat_purple.svg'}
          description="Только название канала. Название в url: https://www.twitch.tv/название канала"
        />
      </div>

      {/* Форма для Youtube */}
      <div className={styles.wrapper__block}>
        <StreamControl
          platformName={'youtube'}
          channelName={channelHandleYoutube}
          setChannelName={setChannelHandleYoutube}
          zwiftIdAuth={zwiftIdAuth}
          isEnabled={streams.youtube?.isEnabled || false}
          iconSrc={'/images/youtube_icon.svg'}
          description="Только название канала. Название в url после @: https://www.youtube.com/@название канала"
        />
      </div>
    </div>
  );
}
