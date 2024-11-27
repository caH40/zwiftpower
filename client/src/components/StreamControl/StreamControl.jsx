import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchPutUserStreams } from '../../redux/features/api/user-settings/fetchPutUserStreams';
import { putStreams } from '../../redux/features/api/user-settings/userSettingsSlice';
import { getAlert } from '../../redux/features/alertMessageSlice';
import InputSimple from '../UI/Input/InputSimple';
import CheckboxSimple from '../UI/Checkbox/CheckboxSimple';

import styles from './StreamControl.module.css';

/**
 * Компонент ввода названия канала трансляции и включения отображения трансляций соответствующего канала на сайте zp.ru.
 */
export default function StreamControl({
  platformName,
  channelName,
  setChannelName,
  zwiftIdAuth,
  isEnabled,
  iconSrc,
}) {
  const [errorChannelName, setErrorChannelName] = useState('');
  const [disableCheckbox, setDisableCheckbox] = useState(false);

  const dispatch = useDispatch();

  // Обработчик нажатия чекбокса.
  const handleCheckboxChange = (event) => {
    if (!channelName) {
      return;
    }

    const streamsUpdated = {
      [platformName]: {
        channelName,
        isEnabled: event.target.checked,
      },
    };

    dispatch(fetchPutUserStreams({ zwiftId: zwiftIdAuth, streams: streamsUpdated })).then(
      (data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          dispatch(putStreams(data.payload.data));
          dispatch(
            getAlert({ message: data.payload.message, type: 'success', isOpened: true })
          );
        }
      }
    );
  };

  // Обработчик для изменения channelName и автоматического отключения isEnabled.
  // newChannelName данные вводимые в input.
  const handleChannelNameChange = (newChannelName) => {
    setChannelName(newChannelName);

    // Если уже выключена, то не надо передавать это же значение на сервер.
    if (!isEnabled) {
      return;
    }

    const streamsUpdated = {
      [platformName]: {
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

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.subtitle}>
        <img className={styles.icon} src={iconSrc} />
        <span className={styles.subtitle__text}>{platformName}</span>
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
          checked={isEnabled}
          handleCheckboxChange={handleCheckboxChange}
          name={`${platformName}Btn`}
          disabled={disableCheckbox}
        />
      </div>
    </div>
  );
}
