import LogoRider from '../../LogoRider/LogoRider';
import RiderStreamBlock from '../../RiderStreamBlock/RiderStreamBlock';
import TwitchStream from '../TwitchStream/TwitchStream';

import styles from './TwitchStreamBlock.module.css';

/**
 * Компонент для отображения блока Twitch-трансляции.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {TResponseEnabledUserStream} props.stream - Объект с данными о трансляции.
 * @param {Object} props.stream.twitch - Информация о Twitch-канале.
 * @param {string} props.stream.twitch.channelName - Название канала на Twitch.
 * @returns {JSX.Element} Блок трансляции Twitch или пустой элемент, если `channelName` отсутствует.
 *
 * @typedef {Object} TResponseEnabledUserStream
 * @property {string} _id - Уникальный идентификатор пользователя.
 * @property {Object} zwiftData - Данные пользователя для Zwift.
 * @property {number} zwiftData.id - Идентификатор Zwift.
 * @property {string} zwiftData.firstName - Имя пользователя.
 * @property {string} zwiftData.lastName - Фамилия пользователя.
 * @property {string} zwiftData.category - Категория пользователя.
 * @property {string} zwiftData.racingScore - Рейтинг пользователя.
 * @property {string} zwiftData.imageSrc - URL изображения профиля.
 * @property {string} zwiftData.countryAlpha3 - Код страны пользователя.
 * @property {boolean} zwiftData.male - Пол пользователя.
 * @property {Object} twitch - Данные канала Twitch.
 * @property {string} twitch.channelName - Название канала Twitch.
 */
export default function TwitchStreamBlock({ stream: { twitch, zwiftData } }) {
  // Проверка, что название канала заданно.
  if (!twitch.channelName) {
    return <></>;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <img className={styles.icon} src={'/images/glitch_flat_purple.svg'} />
        {twitch.channelName}
      </h2>
      <div className={styles.spacer}>
        <TwitchStream channel={twitch.channelName} />
      </div>

      <RiderStreamBlock rider={zwiftData} />
    </div>
  );
}
