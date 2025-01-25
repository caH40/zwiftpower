import { Cloud } from './cloud.js';
import { fileTypes } from '../assets/files.js';
import { generateFileName } from '../utils/file-name.js';

// types
import { TSaveFileToCloud } from '../types/types.interface.js';
import { imageSizeMappingOnlyWidth } from '../assets/image-sizes.js';
import { convertToWebP } from '../utils/image-resize.js';
import { TAvailableSizes } from '../types/model.interface.js';

/**
 * Сохраняет файл и оптимизированные файлы изображений в облаке с уникальным суффиксом suffix и возвращает массив имен сохраненных файлов с расширениями.
 */
export async function saveFileToCloud({
  file,
  type,
  suffix,
  needOptimizedImages,
}: TSaveFileToCloud): Promise<string[]> {
  if (!file) {
    throw new Error('Не получен файл для сохранения в Облаке!');
  }

  const typeCurrent = fileTypes.find((elm) => elm.type === type);
  if (!typeCurrent) {
    throw new Error('Не получен или неправильно задан тип файла!');
  }

  const fileNames: string[] = [];

  if (!file.type.startsWith(typeCurrent.testString)) {
    throw new Error(`Загружаемый файл ${file.name} не является ${typeCurrent.description}`);
  }

  // Создание экземпляра класса для работы с облаком.
  const cloud = new Cloud({ cloudName: 'vk', maxSizeFileInMBytes: 5 });

  // Создание нескольких оптимизированных изображений из оригинала
  if (needOptimizedImages) {
    const timeStump = Date.now();

    // Создание массива промисов для выполнения задач.
    const tasks = (Object.keys(imageSizeMappingOnlyWidth) as TAvailableSizes[]).map(
      async (sizeKey) => {
        // Создание оптимизированной версии изображения.
        const fileOptimized = await convertToWebP(file, sizeKey);

        // Создание уникального имени благодаря timestamp с добавлением расширения файла.
        const fileName = generateFileName({ file: fileOptimized, suffix, timeStump, sizeKey });

        // Сохранение имён файлов в массив.
        fileNames.push(fileName);

        // Сохранение файла в облаке.
        const { data } = await cloud.postFile({ file: fileOptimized, fileName });

        if (!data) {
          throw new Error('Не получены данные для Url файла!');
        }

        return data; // Можно сохранить или использовать возвращенные данные.
      }
    );

    // Выполнение всех задач одновременно.
    await Promise.all(tasks);
  } else {
    // Создание уникального имени благодаря timestamp с добавлением расширения файла.
    const fileName = generateFileName({ file, suffix, timeStump: Date.now() });

    // Сохранение имён файлов в массив.
    fileNames.push(fileName);

    // Сохранение файла в облаке.
    const { data } = await cloud.postFile({ file, fileName });
    if (!data) {
      throw new Error('Не получены данные для Url файла!');
    }
  }

  return fileNames;
}
