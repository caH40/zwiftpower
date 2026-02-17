import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HelmetStreams } from '../../components/Helmets/HelmetStreams';
import { fetchUsersEnabledStreams } from '../../redux/features/api/streams/fetchUsersEnabledStreams';
import { resetStreams } from '../../redux/features/api/streams/usersEnabledStreamsSlice';
import useTitle from '../../hook/useTitle';
import CardStream from '../../components/Streams/CardStream/CardStream';
import SkeletonCardTwitchStream from '../../components/SkeletonLoading/SkeletonCardTwitchStream/SkeletonCardTwitchStream';
import BannerInformation from '../../components/BannerInformation/BannerInformation';
import useBannerVisibility from '../../hook/useBannerVisibility';
import { lsPrefixStreams } from '../../constants/localstorage';
import { millisecondsInDay } from '../../assets/dates';
import { useSeparateStreams } from '../../hook/useSeparateStreams';

import styles from './Streams.module.css';

const storageKeyBanner = `${lsPrefixStreams}banner`;

/**
 * Страница Трансляций (стримов) с звифта пользователей сайта.
 */
export default function Streams() {
  useTitle('Трансляции с Zwift');
  const { streams, status: statusUsersEnabledStreams } = useSelector(
    (state) => state.usersEnabledStreams
  );

  const isVisibleBanner = useBannerVisibility({
    storageKey: storageKeyBanner,
    intervalMs: millisecondsInDay,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersEnabledStreams());

    return () => dispatch(resetStreams());
  }, []);

  // Разделение каналов на которых идет трансляция и которые находятся в офлайне.
  // Случайное перемешивание трансляций в массивах.
  const { streamsOnline, streamsOffline } = useSeparateStreams(streams);

  return (
    <>
      <HelmetStreams />

      <section className={styles.wrapper}>
        <BannerInformation
          initState={isVisibleBanner}
          storageKey={storageKeyBanner}
          marginBottom={14}
        >
          Хотите, чтобы ваши трансляции были на сайте? Укажите ваш Twitch или YouTube канал в
          настройках профиля!
        </BannerInformation>

        {/* Скелетон загрузки для карточек трансляций */}
        <div className={styles.wrapper__skeleton}>
          {Array.from({ length: 9 }, (_, index) => (
            <SkeletonCardTwitchStream status={statusUsersEnabledStreams} key={index} />
          ))}
        </div>

        {/* Блок с карточками каналов на которых запущена трансляция (LIVE) */}
        {!!streamsOnline.length && (
          <div className={styles.wrapper__streams}>
            {streamsOnline.map((stream) => (
              <CardStream stream={stream} key={stream._id} />
            ))}
          </div>
        )}

        {/* Блок с карточками каналов на которых трансляция не включена */}
        {!!streamsOffline.length && (
          <div className={styles.wrapper__streams}>
            {streamsOffline.map((stream) => (
              <CardStream stream={stream} key={stream._id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
