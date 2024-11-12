import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAd } from '../../hook/useAd';
import { HelmetStreams } from '../../components/Helmets/HelmetStreams';
import { fetchUsersEnabledStreams } from '../../redux/features/api/streams/fetchUsersEnabledStreams';
import { resetStreams } from '../../redux/features/api/streams/usersEnabledStreamsSlice';
import AdContainer from '../../components/AdContainer/AdContainer';
import useTitle from '../../hook/useTitle';
import CardTwitchStream from '../../components/Streams/CardTwitchStream/CardTwitchStream';
import SkeletonCardTwitchStream from '../../components/SkeletonLoading/SkeletonCardTwitchStream/SkeletonCardTwitchStream';
import BannerInformation from '../../components/BannerInformation/BannerInformation';
import useBannerVisibility from '../../hook/useBannerVisibility';
import { lsPrefixStreams } from '../../constants/localstorage';
import { millisecondsInDay } from '../../assets/dates';

import styles from './Streams.module.css';

// рекламные блоки на странице
const adOverFooter = 21;
const adNumbers = [adOverFooter];

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
  const { streamsOnline, streamsOffline } = streams.reduce(
    (acc, stream) => {
      if (stream.twitch.stream) {
        acc.streamsOnline.push(stream);
      } else {
        acc.streamsOffline.push(stream);
      }
      return acc;
    },
    { streamsOnline: [], streamsOffline: [] }
  );

  useAd(adNumbers);

  return (
    <>
      <HelmetStreams />

      <section className={styles.wrapper}>
        <BannerInformation
          initState={isVisibleBanner}
          storageKey={storageKeyBanner}
          marginBottom={14}
        >
          Для отображения вашего канала с трансляциями добавьте название Twitch-канала в
          настройках профиля!
        </BannerInformation>

        {/* Скелетон загрузки для карточек трансляций */}
        <div className={styles.wrapper__skeleton}>
          {Array.from({ length: 9 }, (_, index) => (
            <SkeletonCardTwitchStream status={statusUsersEnabledStreams} key={index} />
          ))}
        </div>

        {!!streamsOnline.length && (
          <div className={styles.wrapper__streams}>
            {streamsOnline.map((stream) => (
              <CardTwitchStream stream={stream} key={stream._id} />
            ))}
          </div>
        )}

        {!!streamsOffline.length && (
          <div className={styles.wrapper__streams}>
            {streamsOffline.map((stream) => (
              <CardTwitchStream stream={stream} key={stream._id} />
            ))}
          </div>
        )}
      </section>

      <AdContainer number={adOverFooter} maxWidth={1105} />
    </>
  );
}
