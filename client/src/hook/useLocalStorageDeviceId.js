import { useEffect, useState } from 'react';

import { lsPrefixDeviceId } from '../constants/localstorage';
import { generateFallbackUUID } from '../utils/generateFallbackUUID';

// Интервал времени для устаревания данных (7 дней).
const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 дней в миллисекундах.

export function useLocalStorageDeviceId() {
  let timestamp = 0;
  let deviceIdFromLC = '';

  // Попытка получить данные из localStorage
  const storedData = localStorage.getItem(lsPrefixDeviceId);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    timestamp = parsedData.timestamp || 0;
    deviceIdFromLC = parsedData.deviceId || '';
  }

  const now = Date.now();

  // Проверка устаревания данных
  if (deviceIdFromLC && now - timestamp < EXPIRATION_TIME) {
    return deviceIdFromLC;
  } else {
    const newDeviceId = crypto.randomUUID?.() || generateFallbackUUID(); // Генерация UUID.
    localStorage.setItem(
      lsPrefixDeviceId,
      JSON.stringify({ deviceId: newDeviceId, timestamp: now })
    );
    return newDeviceId;
  }
}
