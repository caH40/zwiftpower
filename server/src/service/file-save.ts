import { Cloud } from './cloud.js';
import { fileTypes } from '../assets/files.js';
import { generateFileName } from '../utils/file-name.js';

// types
import { TSaveFile } from '../types/types.interface.js';

/**
 * Сохраняет файл в облаке с уникальным суффиксом suffix и возвращает URL сохраненного файла.
 */
export async function saveFileToCloud({ file, type, suffix }: TSaveFile): Promise<string> {
  if (!file) {
    throw new Error('Не получен файл для сохранения в Облаке!');
  }

  const typeCurrent = fileTypes.find((elm) => elm.type === type);
  if (!typeCurrent) {
    throw new Error('Не получен или неправильно задан тип файла!');
  }

  let fileName = '';

  if (!file.type.startsWith(typeCurrent.testString)) {
    throw new Error(`Загружаемый файл ${file.name} не является ${typeCurrent.description}`);
  }

  // Создание уникального имени благодаря timestamp с добавлением расширения файла.
  fileName = generateFileName(file, suffix);

  const cloud = new Cloud({ cloudName: 'vk', maxSizeFileInMBytes: 5 });
  const { data } = await cloud.postFile({ file, fileName });
  if (!data) {
    throw new Error('Не получены данные для Url файла!');
  }

  return `https://${data.file.bucketName}.${data.file.endpointDomain}/${fileName}`;
}
