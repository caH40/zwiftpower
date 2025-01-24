import { TAvailableSizes } from '../types/model.interface';

/**
 * Соответствие размеров изображений в пикселях и названий.
 */
export const imageSizeMapping: Record<
  TAvailableSizes,
  { width: number; height: number } | null
> = {
  small: { width: 720, height: 450 }, // Мобильные устройства
  medium: { width: 1366, height: 854 }, // Планшеты и компактные ноутбуки
  large: { width: 1920, height: 1200 }, // FHD
  xLarge: { width: 2560, height: 1600 }, // 2K и выше
  original: null, // Оригинальный размер
};
