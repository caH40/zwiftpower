import { Cloud } from '../service/cloud.js';

// types
import { TFileMetadataForCloud } from '../types/model.interface.js';

/**
 * Генерирует ссылки для всех доступных размеров файла на основе предоставленных метаданных.
 *
 * @param metadata - Метаданные, описывающие файл и его доступные размеры.
 * @param metadata.baseName - Базовое имя файла без расширений.
 * @param metadata.originalExtension - Оригинальное расширение файла (например, jpg, png).
 * @param metadata.optimizedExtension - Оптимизированное расширение файла (например, webp).
 * @param metadata.availableSizes - Массив доступных размеров файла.
 * @returns Объект, содержащий ссылки для всех доступных размеров.
 *
 */
export function createUrlsToFileCloud(
  metadata?: TFileMetadataForCloud
): Record<string, string> | undefined {
  if (!metadata) {
    return;
  }

  const { baseName, originalExtension, optimizedExtension, availableSizes } = metadata;

  if (!availableSizes) {
    return;
  }

  // Инициализация облачного сервиса для получения имени бакета и домена.
  const cloud = new Cloud({ cloudName: 'vk' });
  const bucketName = cloud.bucketName;
  const endpointDomain = cloud.endpointDomain;

  // Объект для хранения ссылок для каждого доступного размера.
  const urls: Record<string, string> = {};

  // Перебираем доступные размеры и генерируем соответствующие ссылки.
  for (const size of availableSizes) {
    const extension = size === 'original' ? originalExtension : optimizedExtension;
    urls[size] = `https://${bucketName}.${endpointDomain}/${baseName}-${size}.${extension}`;
  }

  return urls;
}
