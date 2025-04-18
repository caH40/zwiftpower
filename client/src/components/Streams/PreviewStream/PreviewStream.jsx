import cn from 'classnames/bind';

import TimeCounter from '../../UI/TimeCounter/TimeCounter';

import styles from './PreviewStream.module.css';

const cx = cn.bind(styles);

/**
 * Компонент для отображения Эскиза-трансляции с индикатором загрузки или заставки канала.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isLive - Трансляция онлайн или нет.
 * @param {string} props.title - Трансляция онлайн или нет.
 * @param {string} props.thumbnailUrl - Скриншот с трансляции.
 * @param {number} props.viewerCount - Количество зрителей.
 * @param {number} props.bannerUrl - Заставки профиля.
 * @param {number} props.description - Описание канала.
 * @param {Date} props.startedAt - Начало трансляции.
 * @returns {JSX.Element} Элемент.
 */
export default function PreviewStream({
  isLive,
  title,
  thumbnailUrl,
  bannerUrl,
  viewerCount,
  description,
  startedAt,
}) {
  return (
    <div className={styles.wrapper}>
      {isLive ? (
        <>
          <img src={thumbnailUrl} className={styles.thumbnail} />
          <div className={cx('boxes', 'live')}>live</div>
          <div className={cx('boxes', 'viewers')}>{`${viewerCount || 0} viewers`}</div>
          <h3 className={cx('boxes', 'title__stream')}>{title}</h3>
          <div className={cx('boxes', 'start')}>
            <TimeCounter startDate={startedAt} />
          </div>
        </>
      ) : (
        <>
          <img src={bannerUrl} className={styles.profileImage} />
          {description && <div className={cx('live', 'viewers')}>{description}</div>}
          <div className={cx('boxes', 'offline')}>Stream Ended</div>
        </>
      )}
    </div>
  );
}
