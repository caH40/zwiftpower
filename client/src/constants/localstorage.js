// Хранение названий переменных для LocalStorage

const prefixSite = '__zp_';

/**
 * Суффикс для localStorage для страницы /riders.
 */
export const lsPrefixRiders = `${prefixSite}riders-`;
/**
 * Суффикс для localStorage для Трансляции /streams.
 */
export const lsPrefixStreams = `${prefixSite}streams-`;
/**
 * Суффикс для localStorage для deviceId. Уникальный Id для оборудования/браузера.
 */
export const lsPrefixDeviceId = `${prefixSite}deviceId-`;
