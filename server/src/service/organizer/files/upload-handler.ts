import { convertMulterFileToWebFile } from '../../../utils/file.js';
import { saveFileToCloud } from './file-save.js';
import { Cloud } from '../../cloud.js';
import { handleAndLogError } from '../../../errors/error.js';

// types
// import { TOrganizerImageUrls } from "../../../types/types.interface";

/**
 * Сохраняет новые файлы, удаляет старые, которые заменили на новые в облаке.
 */
export async function uploadFileToCloudHandler({
  entity,
  shortName,
  imageFile,
  baseNameOld,
  needOptimizedImages,
}: {
  entity: 'poster' | 'logo';
  shortName: string;
  imageFile: Express.Multer.File;
  baseNameOld?: string;
  needOptimizedImages: boolean;
}): Promise<string[]> {
  // Экземпляр класса Облака.
  const cloud = new Cloud({ cloudName: 'vk', maxSizeFileInMBytes: 5 });

  const suffixImage = `organizers-${shortName}-${entity}-`;

  const uploadedFileNames = await saveFileToCloud({
    file: convertMulterFileToWebFile({ file: imageFile }),
    type: 'image',
    suffix: suffixImage,
    needOptimizedImages,
  });

  // Удаление замещенных (старых) файлов изображений из облака.
  baseNameOld &&
    (await cloud
      .deleteFile({
        prefix: baseNameOld,
      })
      .catch((e) => handleAndLogError(e)));

  return uploadedFileNames;
}
