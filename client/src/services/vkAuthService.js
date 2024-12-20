import { postRegistrationVk } from '../api/registration';

export const handleVkAuth = async () => {
  const VKID = await loadVKIDSDK();

  // Инициализация VKID
  VKID.Config.init({
    app: 52861345, // ID вашего приложения VK
    redirectUrl: 'http://localhost/api/auth/callback/vk',
    responseMode: VKID.ConfigResponseMode.Callback,
    source: VKID.ConfigSource.LOWCODE,
    scope: 'email', // Укажите нужные доступы, необходимые данные в профиле пользователя vk.
  });

  const floatingOneTap = new VKID.FloatingOneTap();

  floatingOneTap
    .render({
      appName: 'Авторизация на сайте zwiftpower.ru',
      showAlternativeLogin: true,
      oauthList: ['vkid'], // 'mail_ru', 'ok_ru'
    })
    .on(VKID.WidgetEvents.ERROR, vkidOnError)
    .on(VKID.FloatingOneTapInternalEvents.LOGIN_SUCCESS, async function (payload) {
      const { code, device_id } = payload;

      try {
        floatingOneTap.close();

        const tokens = await VKID.Auth.exchangeCode(code, device_id);
        await postRegistrationVk({ tokens, deviceId: device_id });
        window.alert('Регистрация прошла успешно!');
        // const profile = await VKID.Auth.userInfo(tokens.access_token);
      } catch (error) {
        vkidOnError(error);
      }
    });

  function vkidOnError(error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка VKID:', error);
  }
};

/**
 * Загружает VKID SDK динамически.
 * @returns {Promise<Object>} Возвращает Promise с VKID SDK после загрузки.
 */
function loadVKIDSDK() {
  return new Promise((resolve, reject) => {
    if (window.VKIDSDK) {
      resolve(window.VKIDSDK);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
    script.async = true;

    script.onload = () => resolve(window.VKIDSDK);
    script.onerror = () => reject(new Error('Не удалось загрузить VKID SDK'));

    document.body.appendChild(script);
  });
}
