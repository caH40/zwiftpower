import cn from 'classnames/bind';

import TimeCounter from '../../UI/TimeCounter/TimeCounter';

import styles from './TwitchStream.module.css';

const cx = cn.bind(styles);

/**
 * Компонент для отображения Twitch-трансляции с индикатором загрузки.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isLive - Трансляция онлайн или нет.
 * @param {string} props.title - Трансляция онлайн или нет.
 * @param {string} props.thumbnailUrl - Скриншот с трансляции.
 * @param {number} props.viewerCount - Количество зрителей.
 * @param {number} props.offlineImageUrl - Заставки профиля.
 * @param {number} props.profileImageUrl - Заставки профиля.
 * @param {number} props.description - Описание канала.
 * @param {Date} props.startedAt - Начало трансляции.
 * @returns {JSX.Element} Элемент, содержащий плеер Twitch или индикатор загрузки.
 */
function TwitchStream({
  isLive,
  title,
  thumbnailUrl,
  viewerCount,
  offlineImageUrl,
  profileImageUrl,
  description,
  startedAt,
  size = { width: 400, height: 225 },
}) {
  const { width, height } = size;
  const thumbnailUrlCurrent =
    thumbnailUrl &&
    thumbnailUrl.replace('{width}x{height}', `${width}x${height}`).replace('{height}', 225);

  const profileImage = offlineImageUrl ? offlineImageUrl : profileImageUrl;

  return (
    <div className={styles.wrapper}>
      {isLive ? (
        <>
          <img src={thumbnailUrlCurrent} className={styles.thumbnail} />
          <div className={cx('boxes', 'live')}>live</div>
          <div className={cx('boxes', 'viewers')}>{`${viewerCount} viewers`}</div>
          <h3 className={cx('boxes', 'title__stream')}>{title}</h3>
          <div className={cx('boxes', 'start')}>
            <TimeCounter startDate={startedAt} />
          </div>
        </>
      ) : (
        <>
          <img src={profileImage} className={styles.profileImage} />
          {description && <div className={cx('live', 'viewers')}>{description}</div>}
          <div className={cx('boxes', 'offline')}>Stream Ended</div>
        </>
      )}
    </div>
  );
}

export default TwitchStream;
