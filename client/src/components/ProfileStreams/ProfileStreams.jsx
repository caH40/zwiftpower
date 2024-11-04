import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPutUserStreams } from '../../redux/features/api/user-settings/fetchPutUserStreams';
import { putStreams } from '../../redux/features/api/user-settings/userSettingsSlice';
import CheckboxSimple from '../UI/Checkbox/CheckboxSimple';
import InputSimple from '../UI/Input/InputSimple';

import styles from './ProfileStreams.module.css';

/**
 * Форма изменения настроек для трансляций.
 */
export default function ProfileStreams({ zwiftIdAuth }) {
  const { streams } = useSelector((state) => state.userSettings);

  const [channelName, setChannelName] = useState('');
  const dispatch = useDispatch();

  // Устанавливаем начальное значение channelName после получения данных с сервера
  useEffect(() => {
    if (streams?.twitch?.channelName) {
      setChannelName(streams.twitch.channelName);
    }
  }, [streams.twitch.channelName]);

  const handleCheckboxChange = (event) => {
    const streamsUpdated = {
      twitch: {
        channelName,
        isEnabled: event.target.checked,
      },
    };
    dispatch(fetchPutUserStreams({ zwiftId: zwiftIdAuth, streams: streamsUpdated })).then(
      (data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          dispatch(putStreams(data.payload.data));
        }
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Трансляции</h3>

      <h4 className={styles.subtitle}>
        <img className={styles.icon} src={'/images/glitch_flat_purple.svg'} />
        Twitch
      </h4>

      <div className={styles.box__input}>
        <label>Название канала</label>
        <InputSimple
          value={channelName}
          setValue={setChannelName}
          type="text"
          name="channelName"
        />
      </div>

      <div className={styles.box__checkbox}>
        <span>Отображение трансляции</span>
        <CheckboxSimple
          checked={streams.twitch.isEnabled}
          handleCheckboxChange={handleCheckboxChange}
          name={'twitchBtn'}
        />
      </div>
    </div>
  );
}
