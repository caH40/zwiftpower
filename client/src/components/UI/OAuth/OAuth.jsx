import { handleVkAuth } from '../../../services/vkAuthService';

import styles from './OAuth.module.css';

const items = [
  {
    id: 0,
    iconSrc: '/images/vk.svg',
    handlerOnClick: handleVkAuth,
  },
];
/**
 * Блок регистрации через OAuth.
 */
export default function OAuth() {
  return (
    <section className={styles.wrapper}>
      {items.map((item) => (
        <img
          key={item.id}
          className={styles.icon}
          src={item.iconSrc}
          onClick={item.handlerOnClick}
          alt="OAuth icon"
          role="button"
        />
      ))}
    </section>
  );
}

// function handleVkAuth() {
//   // Загружаем VKID SDK динамически
//   const script = document.createElement('script');
//   script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
//   script.async = true;
//   script.onload = initializeVkSdk;
//   document.body.appendChild(script);

//   const postTokens = (authVk) => {
//     axios({
//       url: 'http://localhost:5000/api/auth/vk',
//       method: 'post',
//       data: authVk,
//     }).then((res) => console.log(res.data));
//   };

//   function initializeVkSdk() {
//     if ('VKIDSDK' in window) {
//       const VKID = window.VKIDSDK;

//       // Инициализация VKID
//       VKID.Config.init({
//         app: 52861345, // ID вашего приложения VK
//         redirectUrl: 'http://localhost/api/auth/callback/vk',
//         responseMode: VKID.ConfigResponseMode.Callback,
//         source: VKID.ConfigSource.LOWCODE,
//         scope: 'email', // Укажите нужные доступы
//       });

//       const floatingOneTap = new VKID.FloatingOneTap();

//       floatingOneTap
//         .render({
//           appName: 'Test for ZP',
//           showAlternativeLogin: true,
//           oauthList: ['vkid'], // 'mail_ru', 'ok_ru'
//         })
//         .on(VKID.WidgetEvents.ERROR, vkidOnError)
//         .on(VKID.FloatingOneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
//           const { code, device_id } = payload;

//           console.log('Получен code:', code);

//           VKID.Auth.exchangeCode(code, device_id).then(vkidOnSuccess).catch(vkidOnError);
//         });

//       function vkidOnSuccess(data) {
//         floatingOneTap.close();
//         getUserInfo(data.access_token).then((res) => postTokens(res));
//       }

//       // Получение данных об пользователе.
//       async function getUserInfo(accessToken) {
//         return await VKID.Auth.userInfo(accessToken);
//       }

//       function vkidOnError(error) {
//         console.error('Ошибка VKID:', error);
//         alert('Произошла ошибка при аутентификации.');
//       }
//     }
//   }
// }
