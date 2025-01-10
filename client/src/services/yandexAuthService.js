export const authenticateWithYandex = async () => {
  const yandexID = await loadYandexIDSDK();

  // Инициализация yandex Id
  await yandexID
    .init(
      {
        client_id: '25754f72455a42bc859e05dfc722c1de',
        response_type: 'token',
        redirect_uri: 'http://localhost/api/auth/callback/yandex',
      },
      'http://localhost/auth/authorization',
      {
        view: 'button',
        parentId: 'buttonContainerId',
        buttonView: 'main',
        buttonTheme: 'light',
        buttonSize: 'm',
        buttonBorderRadius: 0,
      }
    )
    .then(({ handler }) => handler())
    .then((data) => console.log('Сообщение с токеном', data)) // eslint-disable-line
    .catch((error) => console.log('Обработка ошибки', error)); // eslint-disable-line
};

/**
 * Загружает YandexID SDK динамически после нажатия кнопки с иконкой Yandex OAuth.
 * @returns {Promise<Object>} Возвращает Promise с VKID SDK после загрузки.
 */
function loadYandexIDSDK() {
  return new Promise((resolve, reject) => {
    if (window.YaAuthSuggest) {
      resolve(window.YaAuthSuggest);
      return;
    }

    const script = document.createElement('script');
    script.src =
      'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
    script.async = true;

    script.onload = () => resolve(window.YaAuthSuggest);
    script.onerror = () => reject(new Error('Не удалось загрузить yandexID SDK'));

    document.body.appendChild(script);
  });
}
