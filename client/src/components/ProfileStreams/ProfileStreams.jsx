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
  const [errorChannelName, setErrorChannelName] = useState('');
  const [disableCheckbox, setDisableCheckbox] = useState(false);

  const [channelName, setChannelName] = useState('');
  const dispatch = useDispatch();

  // Устанавливаем начальное значение channelName после получения данных с сервера.
  useEffect(() => {
    if (streams?.twitch?.channelName) {
      setChannelName(streams.twitch.channelName);
    }
  }, [streams.twitch.channelName]);

  // Контроль вводимых символов для названия канала, запрет использования символов "."" и "/"
  useEffect(() => {
    const regex = /[^a-zA-Z0-9._-]/;
    if (regex.test(channelName)) {
      setErrorChannelName('только название канала');
      setDisableCheckbox(true);
    } else {
      setErrorChannelName('');
      setDisableCheckbox(false);
    }
    if (!channelName) {
      setDisableCheckbox(true);
    }
  }, [channelName]);

  // Обработчик нажатия чекбокса.
  const handleCheckboxChange = (event) => {
    if (!channelName) {
      return;
    }
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

  // Обработчик для изменения channelName и автоматического отключения isEnabled.
  // newChannelName данные вводимые в input.
  const handleChannelNameChange = (newChannelName) => {
    setChannelName(newChannelName);

    // Если уже выключена, то не надо передавать это же значение на сервер.
    if (!streams.twitch.isEnabled) {
      return;
    }

    const streamsUpdated = {
      twitch: {
        channelName: newChannelName,
        isEnabled: false,
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
        <InputSimple
          value={channelName}
          setValue={handleChannelNameChange}
          type="text"
          name="channelName"
          label={'Название канала'}
          validationText={errorChannelName}
        />
      </div>

      <div className={styles.box__checkbox}>
        <span>Отображение трансляции</span>
        <CheckboxSimple
          checked={streams.twitch.isEnabled}
          handleCheckboxChange={handleCheckboxChange}
          name={'twitchBtn'}
          disabled={disableCheckbox}
        />
      </div>
    </div>
  );
}
