/**
 * Сторонние приложения, аккаунт которых можно привязать в настройках профиля.
 * Пока сохраняется только ссылка на профиль сервиса (без OAuth).
 */

/**
 * @typedef {Object} ExternalService
 * @property {string} id - Идентификатор сервиса, он же ключ в `externalAccounts` пользователя.
 * @property {string} name - Название сервиса для интерфейса.
 * @property {string} monogram - Буква для бейджа, если иконка сервиса недоступна.
 * @property {string} icon - Иконка сервиса из `public/images`.
 * @property {'strava' | 'garmin'} theme - Тема бейджа (класс в `ExternalAccountCard.module.css`).
 * @property {string[]} domains - Домены, ссылки на которые считаются корректными.
 * @property {string} hint - Подсказка рядом с полем ввода.
 * @property {string} placeholder - Пример ссылки в поле ввода.
 */

/** @type {ExternalService[]} */
export const EXTERNAL_SERVICES = [
  {
    id: 'strava',
    name: 'Strava',
    monogram: 'S',
    icon: '/images/strava-favicon.png',
    theme: 'strava',
    domains: ['strava.com'],
    hint: 'Ссылка на профиль райдера в Strava',
    placeholder: 'https://www.strava.com/athletes/12345678',
  },
  {
    id: 'garmin',
    name: 'Garmin Connect',
    monogram: 'G',
    icon: '/images/garmin-favicon.png',
    theme: 'garmin',
    domains: ['garmin.com', 'connect.garmin.com'],
    hint: 'Ссылка на профиль в Garmin Connect',
    placeholder: 'https://connect.garmin.com/modern/profile/12345678',
  },
];

/**
 * Проверяет, что введённая ссылка ведёт на профиль нужного сервиса.
 * @param {string} value - Ссылка, введённая пользователем.
 * @param {ExternalService} service - Сервис, к которому привязывается аккаунт.
 * @returns {string} Текст ошибки; пустая строка, если ссылка корректна.
 */
export function validateExternalLink(value, service) {
  const link = value?.trim();

  if (!link) {
    return 'Укажите ссылку на профиль';
  }

  let url;

  try {
    url = new URL(link);
  } catch {
    return 'Ссылка должна начинаться с https://';
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return 'Допустимы только http- и https-ссылки';
  }

  const host = url.hostname.replace(/^www\./, '').toLowerCase();
  const isServiceHost = service.domains.some(
    (domain) => host === domain || host.endsWith(`.${domain}`)
  );

  if (!isServiceHost) {
    return `Ссылка должна вести на ${service.domains[0]}`;
  }

  return '';
}
