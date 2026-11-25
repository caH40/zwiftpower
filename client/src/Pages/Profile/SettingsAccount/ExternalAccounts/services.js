/**
 * Сторонние приложения, аккаунт которых можно привязать в настройках профиля.
 * Хранится и передаётся только ID аккаунта: ссылка на профиль собирается из `urlTemplate`.
 */

/**
 * @typedef {Object} ExternalService
 * @property {string} id - Идентификатор сервиса, он же ключ в `externalAccounts` пользователя.
 * @property {string} name - Название сервиса для интерфейса.
 * @property {string} monogram - Буква для бейджа, если иконка сервиса недоступна.
 * @property {string} icon - Иконка сервиса из `public/images`.
 * @property {'strava' | 'garmin'} theme - Тема бейджа (класс в `ExternalAccountCard.module.css`).
 * @property {string} hint - Подсказка, откуда взять ID аккаунта.
 * @property {string} placeholder - Пример ID в поле ввода.
 * @property {'numeric' | 'text'} inputMode - Подсказка клавиатуре для поля ID.
 * @property {RegExp} idPattern - Допустимый формат ID аккаунта.
 * @property {string} idError - Текст ошибки для неверного формата ID.
 * @property {string} urlTemplate - Шаблон ссылки на профиль, `{id}` заменяется на ID аккаунта.
 */

/** @type {ExternalService[]} */
export const EXTERNAL_SERVICES = [
  {
    id: 'strava',
    name: 'Strava',
    monogram: 'S',
    icon: '/images/strava-favicon.png',
    theme: 'strava',
    hint: 'ID райдера из ссылки strava.com/athletes/<ID>',
    placeholder: '12345678',
    inputMode: 'numeric',
    idPattern: /^\d{3,20}$/,
    idError: 'ID в Strava — только цифры',
    urlTemplate: 'https://www.strava.com/athletes/{id}',
  },
  {
    id: 'garmin',
    name: 'Garmin Connect',
    monogram: 'G',
    icon: '/images/garmin-favicon.png',
    theme: 'garmin',
    hint: 'ID профиля из ссылки connect.garmin.com/modern/profile/<ID>',
    placeholder: '1234567',
    inputMode: 'text',
    idPattern: /^[A-Za-z0-9-]{3,40}$/,
    idError: 'ID в Garmin Connect — цифры, латинские буквы и дефис',
    urlTemplate: 'https://connect.garmin.com/modern/profile/{id}',
  },
];

/**
 * Проверяет формат ID аккаунта в стороннем сервисе.
 * @param {string} value - ID, введённый пользователем.
 * @param {ExternalService} service - Сервис, к которому привязывается аккаунт.
 * @returns {string} Текст ошибки; пустая строка, если ID корректен.
 */
export function validateExternalAccountId(value, service) {
  const accountId = value?.trim();

  if (!accountId) {
    return 'Укажите ID аккаунта';
  }

  if (!service.idPattern.test(accountId)) {
    return service.idError;
  }

  return '';
}

/**
 * Собирает ссылку на профиль в сервисе по ID аккаунта.
 * @param {ExternalService} service - Сервис.
 * @param {string} accountId - ID аккаунта.
 * @returns {string} Ссылка на профиль или пустая строка, если ID не задан.
 */
export function getExternalAccountUrl(service, accountId) {
  const id = accountId?.trim();

  if (!id) {
    return '';
  }

  return service.urlTemplate.replace('{id}', encodeURIComponent(id));
}
