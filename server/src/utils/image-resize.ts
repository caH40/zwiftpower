import sharp from 'sharp';

import { imageSizeMappingOnlyWidth } from '../assets/image-sizes.js';

// types
import { TAvailableSizes } from '../types/model.interface.js';

/**
 * Конвертирует изображение в WebP формат и изменяет размер (если нужно).
 * @param file - Исходный файл изображения.
 * @param sizeKey - Ключ размера ('small' | 'medium' | 'large' | 'original').
 * @returns Новый объект File в формате WebP.
 */
export async function convertToWebP(file: File, sizeKey: TAvailableSizes): Promise<File> {
  if (!imageSizeMappingOnlyWidth[sizeKey]) {
    // Если размер - "original", конвертируем оригинал без изменения размера
    const originalBuffer = Buffer.from(await file.arrayBuffer());

    const webpBuffer = await sharp(originalBuffer)
      .webp({ quality: 80 }) // Конвертация в WebP с качеством 80
      .toBuffer();

    return new File([webpBuffer], `${file.name.replace(/\.[^/.]+$/, '')}-${sizeKey}.webp`, {
      type: 'image/webp',
    });
  }

  // Получаем параметры изменения размера
  const { width } = imageSizeMappingOnlyWidth[sizeKey];

  const buffer = Buffer.from(await file.arrayBuffer());

  // Изменение размера и конвертация в WebP
  const resizedWebPBuffer = await sharp(buffer)
    .resize(width) // Изменение размера
    // .resize(width, height, { fit: 'cover' }) // Изменение размера
    .webp({ quality: 80 }) // Конвертация в WebP с качеством 80
    .toBuffer();

  // Создание нового объекта File
  return new File(
    [resizedWebPBuffer],
    `${file.name.replace(/\.[^/.]+$/, '')}-${sizeKey}.webp`,
    { type: 'image/webp' }
  );
}
