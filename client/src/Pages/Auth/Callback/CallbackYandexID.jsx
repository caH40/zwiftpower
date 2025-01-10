import { useEffect } from 'react';

export default function CallbackYandexID() {
  useEffect(() => {
    if (!window.YaSendSuggestToken) {
      const script = document.createElement('script');
      script.src =
        'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js';
      script.async = true;
      script.onload = () => {
        window
          .YaSendSuggestToken('https://examplesite.com', {
            kek: true,
          })
          .then((data) => {
            console.log('Токен:', data); // eslint-disable-line
          })
          .catch((error) => console.error('Ошибка:', error)); // eslint-disable-line
      };
      document.body.appendChild(script);
    }
    window.YaSendSuggestToken('http://localhost', {
      flag: true,
    });
  }, []);
  return <div></div>;
}
