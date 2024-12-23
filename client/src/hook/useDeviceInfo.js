import { useEffect, useState } from 'react';

/**
 * Хук для получения информации об устройстве пользователя.
 *
 * Возвращает объект с информацией о текущем устройстве, включая:
 * - Уникальный идентификатор устройства (deviceId).
 * - Информацию о браузере и операционной системе (userAgent).
 * - Язык браузера (language).
 * - Разрешение экрана устройства (screenResolution).
 */
export function useDeviceInfo() {
  // Состояние для хранения информации об устройстве.
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: '', // Уникальный идентификатор устройства.
    userAgent: '', // Информация о браузере и ОС.
    language: '', // Язык браузера.
    screenResolution: '', // Разрешение экрана.
  });

  useEffect(() => {
    /**
     * Функция для обновления информации об устройстве.
     * Генерирует новый deviceId и обновляет другие данные.
     */

    setDeviceInfo({
      deviceId: crypto.randomUUID(), // Генерация уникального идентификатора устройства.
      userAgent: navigator.userAgent, // Информация о браузере и ОС.
      language: navigator.language, // Язык браузера.
      screenResolution: `${window.screen.width}x${window.screen.height}`, // Разрешение экрана.
    });
  }, []);

  return deviceInfo;
}
