import { useDispatch } from 'react-redux';

import { getAlert } from '../../../redux/features/alertMessageSlice';
import RiderStreamBlock from '../../RiderStreamBlock/RiderStreamBlock';
import TwitchStream from '../TwitchStream/TwitchStream';
import MyTooltip from '../../../HOC/MyTooltip';

import styles from './CardTwitchStream.module.css';

/**
 * Компонент для отображения блока Twitch-трансляции.
 */

export default function CardTwitchStream({ stream: { twitch, zwiftData } }) {
  const dispatch = useDispatch();
  // Проверка, что найден канал твича.
  if (!twitch) {
    return <></>;
  }

  const urlChannel = `https://player.twitch.tv/?channel=${twitch.channel.title}&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&quality=auto&volume=0.5`;

  const copyText = () => {
    navigator.clipboard
      .writeText(urlChannel)
      .then(() => {
        dispatch(
          getAlert({
            message: 'url трансляции скопирован в буфер обмена',
            type: 'success',
            isOpened: true,
          })
        );
      })
      .catch(() => {
        dispatch(
          getAlert({
            message: 'Ошибка при копировании в буфер обмена',
            type: 'error',
            isOpened: true,
          })
        );
      });
  };

  return (
    <div className={styles.wrapper}>
      <a href={`https://twitch.tv/${twitch.channel.title}`} target="_blank" rel="noreferrer">
        <TwitchStream
          isLive={twitch.online}
          title={twitch.title}
          thumbnailUrl={twitch.thumbnailUrl}
          viewerCount={twitch.viewerCount}
          bannerUrl={twitch.channel.bannerUrl}
          description={twitch.channel.description}
          startedAt={twitch.startedAt}
        />
      </a>

      <div className={styles.description}>
        <h2 className={styles.title}>
          {twitch.channel.title}

          <MyTooltip tooltip="Ссылка на плеер twitch">
            <img
              className={styles.icon__twitch}
              src={'/images/twitch_wordmark_extruded_purple.svg'}
              onClick={copyText}
            />
          </MyTooltip>
        </h2>

        {/* Не все райдеры привязали zwiftId к профилю, поэтому у некоторых riderCurrent = undefined */}
        {zwiftData && <RiderStreamBlock rider={zwiftData} />}
      </div>
    </div>
  );
}
