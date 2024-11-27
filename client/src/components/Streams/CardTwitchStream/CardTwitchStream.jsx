import { useDispatch } from 'react-redux';

import { getAlert } from '../../../redux/features/alertMessageSlice';
import RiderStreamBlock from '../../RiderStreamBlock/RiderStreamBlock';
import TwitchStream from '../TwitchStream/TwitchStream';
import MyTooltip from '../../../HOC/MyTooltip';

import styles from './CardTwitchStream.module.css';

/**
 * Компонент для отображения блока Twitch-трансляции.
 */

export default function CardTwitchStream({ stream: { data, zwiftData, platform } }) {
  const dispatch = useDispatch();

  // Проверка, что найден канал твича.
  if (!data) {
    return <></>;
  }

  const urlChannel = `https://player.twitch.tv/?channel=${data.channel.title}&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&quality=auto&volume=0.5`;

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
      <a href={`https://twitch.tv/${data.channel.title}`} target="_blank" rel="noreferrer">
        <TwitchStream
          isLive={data.online}
          title={data.title}
          thumbnailUrl={data.thumbnailUrl}
          viewerCount={data.viewerCount}
          bannerUrl={data.channel.bannerUrl}
          description={data.channel.description}
          startedAt={data.startedAt}
        />
      </a>

      <div className={styles.description}>
        <h2 className={styles.title}>
          {data.channel.title}

          <MyTooltip tooltip="Ссылка на плеер twitch">
            <img
              className={styles.icon__twitch}
              src={
                platform === 'twitch'
                  ? '/images/twitch_wordmark_extruded_purple.svg'
                  : '/images/youtube_wordmark_extruded.svg'
              }
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
