import { useDispatch } from 'react-redux';
import cn from 'classnames/bind';

import { getAlert } from '../../../redux/features/alertMessageSlice';
import { useCardStream } from '../../../hook/useCardStream';
import RiderStreamBlock from '../../RiderStreamBlock/RiderStreamBlock';
import PreviewStream from '../PreviewStream/PreviewStream';
import MyTooltip from '../../../HOC/MyTooltip';

import styles from './CardStream.module.css';

const cx = cn.bind(styles);

/**
 * Компонент для отображения блока Twitch-трансляции.
 */
export default function CardStream({ stream: { data, zwiftData, platform } }) {
  const dispatch = useDispatch();

  // Выбор данных в зависимости от платформы.
  const { srcIconPlatform, urlsChannel, urlPlayerChannel } = useCardStream({
    platform,
    handleYoutube: data.channel.handleYoutube,
    videoIdYoutube: data.videoIdYoutube,
    channelNameTwitch: data.channel.title,
  });

  const copyText = () => {
    navigator.clipboard
      .writeText(urlPlayerChannel)
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
      <a
        href={data.online ? urlsChannel.online : urlsChannel.offline}
        target="_blank"
        rel="noreferrer"
      >
        <PreviewStream
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

          <MyTooltip tooltip={urlPlayerChannel && `Ссылка на плеер ${platform}`}>
            <img
              className={cx('icon__logo', { icon__copy: urlPlayerChannel })}
              src={srcIconPlatform}
              onClick={urlPlayerChannel ? copyText : null}
            />
          </MyTooltip>
        </h2>

        {/* Не все райдеры привязали zwiftId к профилю, поэтому у некоторых riderCurrent = undefined */}
        {zwiftData && <RiderStreamBlock rider={zwiftData} />}
      </div>
    </div>
  );
}
