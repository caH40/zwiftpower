/**
 * Формирование объекта для карточки канала с трансляцией Twitch или YouTube.
 *
 * @param {Object} params - Входные параметры.
 * @param {Stream} params.stream - Общие данные стрима пользователя.
 * @param {'twitch' | 'youtube'} params.platform - Название платформы, на которой запущена трансляция.
 * @returns {Object} Объект карточки трансляции.
 */
export function createObjStream({ platform, stream }) {
  return {
    _id: `${platform}-${stream._id}`,
    zwiftData: stream.zwiftData,
    data: stream[platform], // Динамическое свойство для платформы.
    platform,
  };
}

/**
 * @typedef {Object} Stream
 * @property {ZwiftData} zwiftData - Данные райдера из Zwift, который ведет трансляцию.
 * @property {StreamData} twitch - Данные трансляции для Twitch.
 * @property {StreamData} youtube - Данные трансляции для YouTube.
 * @property {string} _id - Уникальный ID документа stream из БД сервера.
 */

/**
 * @typedef {Object} Channel
 * @property {string} title - Имя канала (ручка).
 * @property {string} [bannerUrl] - URL баннера канала.
 * @property {string} [description] - Описание канала.
 * @property {string} [handleYoutube] - Ручка в YouTube.
 * @property {string} [nameTwitch] - Имя канала в Twitch.
 */

/**
 * @typedef {Object} StreamData
 * @property {boolean} online - Статус трансляции (онлайн или нет).
 * @property {string|null} title - Название трансляции.
 * @property {string|null} thumbnailUrl - Эскиз трансляции (стоп-кадр).
 * @property {number|null} viewerCount - Количество зрителей.
 * @property {string|null} startedAt - Дата старта трансляции в формате ISO 8601.
 * @property {Channel} channel - Информация о канале.
 */
