// types
import { TAvailableSizes } from '../types/model.interface';

/**
 * Создает имя файла для сохранения в облаке.
 * @returns название файла {suffix}{Date}.{extension}
 */
export function generateFileName({
  file,
  suffix,
  timeStump,
  sizeKey = 'original',
}: {
  file: File;
  suffix: string;
  timeStump: number;
  sizeKey?: TAvailableSizes;
}): string {
  const fileName = suffix + timeStump;
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (!extension) {
    throw new Error(`Нет расширения в сохраняемом файле: ${file.name}`);
  }

  return `${fileName}-${sizeKey}.${extension}`;
}
