import { fileTypes } from '../../../assets/files.js';
import { imageSizeMappingOnlyWidth } from '../../../assets/image-sizes.js';
import { generateFileName } from '../../../utils/file-name.js';
import { convertToWebP } from '../../../utils/image-resize.js';
import { Cloud } from '../../cloud.js';

// types
import { TAvailableSizes } from '../../../types/model.interface.js';
import { TSaveFileToCloud } from '../../../types/types.interface.js';

/**
 * Сохраняет файл и оптимизированные файлы изображений в облаке с уникальным суффиксом и возвращает массив имен сохраненных файлов.
 */
export async function saveFileToCloud({
  file,
  type,
  suffix,
  needOptimizedImages,
}: TSaveFileToCloud): Promise<string[]> {
  if (!file) {
    throw new Error('Не получен файл для сохранения в облаке!');
  }

  const typeCurrent = fileTypes.find((elm) => elm.type === type);
  if (!typeCurrent) {
    throw new Error('Некорректно указан тип файла!');
  }

  if (!file.type.startsWith(typeCurrent.testString)) {
    throw new Error(`Файл ${file.name} не является ${typeCurrent.description}`);
  }

  const cloud = new Cloud({ cloudName: 'vk', maxSizeFileInMBytes: 5 });
  const timeStump = Date.now(); // Время используется в именах файлов.
  const fileNames: string[] = [];

  // Оптимизация и сохранение на облаке.
  const saveFile = async (inputFile: File, sizeKey?: TAvailableSizes): Promise<void> => {
    // Не проводиться оптимизация если ключ размера не задан, или если это оригинальное изображение.
    const optimizedFile =
      sizeKey && sizeKey !== 'original' ? await convertToWebP(inputFile, sizeKey) : inputFile;
    const fileName = generateFileName({ file: optimizedFile, suffix, timeStump, sizeKey });
    fileNames.push(fileName);

    const { data } = await cloud.postFile({ file: optimizedFile, fileName });
    if (!data) {
      throw new Error('Ошибка при получении данных URL файла!');
    }
  };

  if (needOptimizedImages) {
    const tasks = (Object.keys(imageSizeMappingOnlyWidth) as TAvailableSizes[]).map((sizeKey) =>
      saveFile(file, sizeKey)
    );
    await Promise.all(tasks);
  } else {
    await saveFile(file);
  }

  return fileNames;
}
