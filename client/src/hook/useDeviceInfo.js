import { useEffect, useState } from 'react';

import { useLocalStorageDeviceId } from './useLocalStorageDeviceId'; // Импортируем ваш хук

/**
 * Хук для получения информации об устройстве пользователя.
 */
export function useDeviceInfo() {
  // Используем хук для получения deviceId
  const deviceId = useLocalStorageDeviceId();

  // Состояние для хранения информации об устройстве.
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: '',
    userAgent: '',
    language: '',
    screenResolution: '',
  });

  useEffect(() => {
    // Обновление информации об устройстве один раз при монтировании компонента
    setDeviceInfo({
      deviceId, // Используем deviceId из useLocalStorageDeviceId
      userAgent: navigator.userAgent, // Информация о браузере и ОС
      language: navigator.language, // Язык браузера
      screenResolution: `${window.screen.width}x${window.screen.height}`, // Разрешение экрана
    });
  }, []); // Пустой массив зависимостей, хук сработает только один раз

  return deviceInfo;
}
