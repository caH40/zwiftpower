import slugify from 'slugify';

import { imageStorageHandler } from './organizer/files/imageStorage-handler.js';
import { parseAndGroupFileNames } from '../utils/parseAndGroupFileNames.js';

// types
import { TFileMetadataForCloud } from '../types/model.interface.js';
import { handleAndLogError } from '../errors/error.js';
import { Cloud } from './cloud.js';

export class ImagesService {
  /**
   * Метод работы с файлами изображений. Создание название для файлов и сохранение их в Облаке.
   */
  static save = async ({
    name,
    shortName,
    baseNameLogoOld,
    baseNamePosterOld,
    logoFile,
    posterFile,
  }: {
    name: string;
    shortName: string;
    baseNameLogoOld?: string; // Базовое название файла изображениям в облаке.
    baseNamePosterOld?: string; // Базовое название файла изображениям в облаке.
    logoFile: Express.Multer.File | undefined;
    posterFile: Express.Multer.File | undefined;
  }): Promise<{
    logoFileInfo: TFileMetadataForCloud | null;
    posterFileInfo: TFileMetadataForCloud | null;
  }> => {
    // Суффикс для названия файла в объектном хранилище в Облаке.
    const entitySuffix = `series-${slugify(name, {
      lower: true,
      strict: true,
    })}`;

    // Создание название файла для изображения и сохранение файла в облачном хранилище Облака.
    const { uploadedFileNamesLogo, uploadedFileNamesPoster } = await imageStorageHandler({
      shortName: shortName.toLowerCase(),
      baseNameLogoOld,
      baseNamePosterOld,
      logoFile,
      posterFile,
      entitySuffix,
    });

    const logoFileInfo = parseAndGroupFileNames(uploadedFileNamesLogo);
    const posterFileInfo = parseAndGroupFileNames(uploadedFileNamesPoster);

    return { logoFileInfo, posterFileInfo };
  };

  /**
   * Удаление файлов изображения из объектного хранилища.
   */
  static delete = async (baseNames: (string | undefined)[]): Promise<void> => {
    // Удаление замещенных (старых) файлов изображений из облака.
    const cloud = new Cloud({ cloudName: 'vk', maxSizeFileInMBytes: 5 });

    for (const baseName of baseNames) {
      if (!baseName) {
        continue;
      }
      await cloud
        .deleteFiles({
          prefix: baseName,
        })
        .catch((e) => handleAndLogError(e));
    }
  };
}
