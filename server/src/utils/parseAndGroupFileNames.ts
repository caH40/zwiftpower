import { TAvailableSizes, TFileMetadataForCloud } from '../types/model.interface';

/**
 * Парсит массив названий файлов и возвращает объект TFileMetadataForCloud.
 * @param fileNames - Массив строк с названиями файлов.
 * @returns Объект типа TFileMetadataForCloud.
 */
export function parseAndGroupFileNames(
  fileNames: string[] | null
): TFileMetadataForCloud | null {
  if (!fileNames || !fileNames?.length) {
    return null;
  }

  const fileRegex =
    /^(?<baseName>[\w-]+)-(?<size>original|large|medium|small|xLarge)\.(?<extension>\w+)$/;

  const metadata: TFileMetadataForCloud = {
    baseName: '',
    originalExtension: '',
    optimizedExtension: 'webp',
    availableSizes: [],
  };

  for (const fileName of fileNames) {
    const match = fileName.match(fileRegex);

    if (!match || !match.groups) {
      throw new Error(`Неверный формат названия файла: ${fileName}`);
    }

    const { baseName, size, extension } = match.groups;

    if (!['original', 'large', 'medium', 'small', 'xLarge'].includes(size)) {
      throw new Error(`Некорректный размер изображения в файле: ${fileName}`);
    }

    // Устанавливаем базовое имя и оригинальное расширение, если это оригинал
    if (size === 'original') {
      metadata.baseName = baseName;
      metadata.originalExtension = extension;
    }

    // Добавляем размер в список доступных размеров
    if (!metadata.availableSizes.includes(size as TAvailableSizes)) {
      metadata.availableSizes.push(size as TAvailableSizes);
    }
  }

  return metadata;
}
