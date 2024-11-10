import { useDispatch } from 'react-redux';

import { getAlert } from '../../../redux/features/alertMessageSlice';
import RiderStreamBlock from '../../RiderStreamBlock/RiderStreamBlock';
import TwitchStream from '../TwitchStream/TwitchStream';
import MyTooltip from '../../../HOC/MyTooltip';

import styles from './TwitchStreamBlock.module.css';

/**
 * Компонент для отображения блока Twitch-трансляции.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {TResponseEnabledUserStream} props.stream - Объект с данными о трансляции.
 *
 *
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
 * @property {Object} twitch - Данные пользователя для Zwift.
 * @property {TTwitchStreamDto | undefined} twitch.stream - Данные по стриму онлайн.
 * @property {TTwitchUserDto} twitch.user - Данные по каналу с твича.
 *
 * @typedef {Object} TTwitchStreamDto
 * @property {string} id - Уникальный идентификатор стрима.
 * @property {string} userId - Идентификатор пользователя.
 * @property {string} userLogin - Логин пользователя.
 * @property {string} userName - Имя пользователя.
 * @property {string} gameId - Идентификатор игры.
 * @property {string} gameName - Название игры.
 * @property {string} type - Тип стрима (например, 'live').
 * @property {string} title - Заголовок стрима.
 * @property {string[]} tags - Теги, связанные со стримом.
 * @property {number} viewerCount - Количество зрителей.
 * @property {Date} startedAt - Время начала стрима.
 * @property {string} language - Язык стрима.
 * @property {string} thumbnailUrl - URL превью изображения.
 * @property {unknown[]} tagIds - Идентификаторы тегов.
 * @property {boolean} isMature - Является ли контент стрима предназначенным для взрослых.
 *
 * @typedef {Object} TTwitchUserDto
 * @property {string} id - Уникальный идентификатор пользователя.
 * @property {string} login - Логин пользователя.
 * @property {string} displayName - Отображаемое имя пользователя.
 * @property {string} type - Тип учетной записи (например, 'user').
 * @property {string} broadcasterType - Тип вещателя (например, 'affiliate').
 * @property {string} description - Описание пользователя.
 * @property {string} profileImageUrl - URL изображения профиля.
 * @property {string} offlineImageUrl - URL изображения для оффлайн-режима.
 * @property {number} viewCount - Общее количество просмотров.
 * @property {Date} createdAt - Дата создания учетной записи.
 *
 */

export default function TwitchStreamBlock({ stream: { twitch, zwiftData } }) {
  const dispatch = useDispatch();
  // Проверка, что найден канал твича.
  if (!twitch) {
    return <></>;
  }

  // Статус трансляции.
  const isLive = twitch.stream?.type === 'live';

  const urlChannel = `https://player.twitch.tv/?channel=${twitch.user.displayName}&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&quality=auto&volume=0.5`;

  const copyText = () => {
    navigator.clipboard
      .writeText(urlChannel)
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
      <a href={`https://twitch.tv/${twitch.user.login}`} target="_blank" rel="noreferrer">
        <TwitchStream
          isLive={isLive}
          title={twitch.stream?.title}
          thumbnailUrl={twitch.stream?.thumbnailUrl}
          viewerCount={twitch.stream?.viewerCount}
          offlineImageUrl={twitch.user.offlineImageUrl}
          profileImageUrl={twitch.user.profileImageUrl}
          description={twitch.user.description}
          startedAt={twitch.stream?.startedAt}
        />
      </a>

      <div className={styles.description}>
        <h2 className={styles.title}>
          {twitch.user.displayName}

          <MyTooltip tooltip="Ссылка на плеер twitch">
            <img
              className={styles.icon__twitch}
              src={'/images/twitch_wordmark_extruded_purple.svg'}
              onClick={copyText}
            />
          </MyTooltip>
        </h2>

        <RiderStreamBlock rider={zwiftData} />
      </div>
    </div>
  );
}
