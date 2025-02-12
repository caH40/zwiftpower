import { useEffect, useRef, useState } from 'react';

/**
 * Компонент с партнерский рекламой сайта https://www.goprotect.ru
 */
const GoProtectWidget = () => {
  const key = useRef(Date.now());

  useEffect(() => {
    // Создаем элемент <script>
    const script = document.createElement('script');
    script.src =
      'https://www.goprotect.ru/widget/alduin?v=latest&partnerId=8694&bump=p8694&type=10&sport=84&duration=1&award=100000&popularsport[]=84&popularsport[]=106&popularsport[]=208&popularsport[]=83';
    script.async = true;

    // Добавляем скрипт в DOM
    document.body.appendChild(script);

    // Удаляем скрипт при размонтировании компонента
    return () => {
      document.body.removeChild(script);
    };
  }, [key.current]); // Зависимость от key

  return (
    <div key={key.current}>
      {/* Контейнер для виджета */}
      <div id="goProtectWidget2021"></div>
    </div>
  );
};

export default GoProtectWidget;
