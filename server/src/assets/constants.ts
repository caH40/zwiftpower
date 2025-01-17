// types
import { SeasonsSeries } from '../types/types.interface.js';

/**
 * Преобразование названий сезонов
 */
export const seasonsSeries: SeasonsSeries = {
  '2022': '2022-2023',
  '2023': '2023-2024',
  '2024': '2024-2025',
  all: 'all',
};

/**
 * Префикс для переменных, используемых в localStorage и cookies в браузере.
 */
export const prefixSite = '__zp_';
/**
 * Название переменной для токена обновления, сохраняемого в cookies.
 */
export const currentNameRefreshToken = `${prefixSite}refreshToken`;
