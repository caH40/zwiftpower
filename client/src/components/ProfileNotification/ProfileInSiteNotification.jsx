import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { lsNotificationVolume } from '../../constants/localstorage';
import { setVolume } from '../../redux/features/audioSlice';
import { audioTracks, VOLUME_MULTIPLIER, VOLUME_STEPS } from '../../assets/audio';
import InputRange from '../UI/InputRange/InputRange';
import Label from '../Label/Label';

import styles from './ProfileNotification.module.css';

export default function ProfileInSiteNotification() {
  const { volume } = useSelector((state) => state.audio);
  const audioRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    audioRef.current = audioTracks.notification;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleOnChange = useCallback(
    (e) => {
      const currentVolume = Number(e.target.value) / VOLUME_MULTIPLIER;
      dispatch(setVolume({ volume: currentVolume }));

      localStorage.setItem(lsNotificationVolume, currentVolume);

      if (audioRef.current) {
        // Останавливаем предыдущее воспроизведение.
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        // Устанавливаем громкость.
        audioRef.current.volume = Math.max(0, Math.min(1, currentVolume));

        // Пытаемся воспроизвести.
        audioRef.current.play().catch((error) => {
          // eslint-disable-next-line no-console
          console.warn('Audio playback failed:', error);
        });
      }
    },
    [dispatch]
  );

  return (
    <div className={styles.wrapper}>
      {/* Оповещения на сайте */}
      <h3 className={styles.title}>Оповещения на сайте</h3>

      <Label id={'volume'} label={'Громкость'}>
        <InputRange
          id={'volume'}
          onInput={handleOnChange}
          step={VOLUME_STEPS}
          value={volume * VOLUME_MULTIPLIER}
          min={0}
          max={VOLUME_MULTIPLIER}
        />
      </Label>
    </div>
  );
}
