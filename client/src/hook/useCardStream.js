/**
 * Хук с утилитами для карточки трансляции. Выбор данных в зависимости от платформы.
 *
 * @param {Object} props - Пропсы.
 * @param {'twitch' | 'youtube'} props.platform - Название платформы с трансляциями.
 * @param {string} [props.handleYoutube] - Название ручки канала YouTube.
 * @param {string} [props.videoIdYoutube] - ID трансляции канала YouTube.
 * @param {string} [props.channelNameTwitch] - Название канала Twitch.
 * @returns {Object} - Данные для отображения трансляции.
 * @returns {string} [return.srcIconPlatform] - Путь к логотипу платформы.
 * @returns {Object} [return.urlsChannel] - URL-ы для онлайн и оффлайн состояния.
 * @returns {string|null} [return.urlPlayerChannel] - URL на плеер Twitch (только для Twitch).
 */
export const useCardStream = ({
  platform,
  handleYoutube = '',
  videoIdYoutube = '',
  channelNameTwitch = '',
}) => {
  // Иконки с логотипами платформ.
  const srcLogos = {
    youtube: '/images/youtube_wordmark_extruded.svg',
    twitch: '/images/twitch_wordmark_extruded_purple.svg',
  };

  // URLs для платформ.
  const urlsByPlatform = {
    youtube: {
      online: `https://www.youtube.com/watch?v=${videoIdYoutube}`,
      offline: `https://www.youtube.com/@${handleYoutube}/streams`,
    },
    twitch: {
      online: `https://twitch.tv/${channelNameTwitch}`,
      offline: `https://twitch.tv/${channelNameTwitch}`,
    },
  };

  // URL на плеер Twitch.
  const playerUrls = {
    twitch: channelNameTwitch
      ? `https://player.twitch.tv/?channel=${channelNameTwitch}&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&quality=auto&volume=0.5`
      : null,
    youtube: null, // У YouTube отдельного плеера в этом случае нет.
  };

  return {
    srcIconPlatform: srcLogos[platform],
    urlsChannel: urlsByPlatform[platform],
    urlPlayerChannel: playerUrls[platform],
  };
};
