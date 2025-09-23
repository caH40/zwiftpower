import slugify from 'slugify';

import { parseAndGroupFileNames } from '../utils/parseAndGroupFileNames.js';

// types
import { TFileMetadataForCloud } from '../types/model.interface.js';
import { handleAndLogError } from '../errors/error.js';
import { Cloud } from './cloud.js';
import { uploadFileToCloudHandler } from './organizer/files/upload-handler.js';
import { entityForFileSuffix } from '../types/types.interface.js';

export class ImagesService {
  /**
   * Метод работы с файлами изображений. Создание название для файлов и сохранение их в Облаке.
   */
  public save = async ({
    name,
    shortName,
    baseNameLogoOld,
    baseNamePosterOld,
    logoFile,
    posterFile,
    entity,
  }: {
    name: string;
    shortName?: string;
    baseNameLogoOld?: string; // Базовое название файла изображениям в облаке.
    baseNamePosterOld?: string; // Базовое название файла изображениям в облаке.
    logoFile: Express.Multer.File | undefined;
    posterFile: Express.Multer.File | undefined;
    entity: entityForFileSuffix;
  }): Promise<{
    logoFileInfo: TFileMetadataForCloud | null;
    posterFileInfo: TFileMetadataForCloud | null;
  }> => {
    // Суффикс для названия файла в объектном хранилище в Облаке.
    const slugifyShortName = slugify(shortName || name, {
      lower: true,
      strict: true,
    });

    // Создание название файла для изображения и сохранение файла в облачном хранилище Облака.
    const { uploadedFileNamesLogo, uploadedFileNamesPoster } = await this.imageStorageHandler({
      shortName: slugifyShortName,
      baseNameLogoOld,
      baseNamePosterOld,
      logoFile,
      posterFile,
      entitySuffix: entity,
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

  /**
   * Обработчик файлов изображений logo и poster Организатора.
   * Сохранение в облаке, возвращение массивы имен файлов, сохраненных в облаке для logo, poster.
   */
  private async imageStorageHandler({
    shortName,
    baseNameLogoOld,
    baseNamePosterOld,
    logoFile,
    posterFile,
    entitySuffix,
  }: {
    shortName: string; // Название сущности slug формате.
    baseNameLogoOld?: string; // Базовое название файла изображениям в облаке.
    baseNamePosterOld?: string; // Базовое название файла изображениям в облаке.
    logoFile?: Express.Multer.File;
    posterFile?: Express.Multer.File;
    entitySuffix: string; // Суффикс для название (используется тип сущности: team, organizer,series...)
  }): Promise<{
    uploadedFileNamesLogo: string[] | null;
    uploadedFileNamesPoster: string[] | null;
  }> {
    // Инициализация массивов в которых будут хранится имена сохраненных файлов изображений в облаке.
    const uploadedFileNames: Record<string, string[] | null> = {
      logo: null,
      poster: null,
    };

    // Если logoFile существует, значит его logo изменили на клиенте. Сохранение в Облаке и в БД.
    if (logoFile) {
      // Сохраняет новые файлы, удаляет старые, которые заменили на новые в облаке.
      uploadedFileNames.logo = await uploadFileToCloudHandler({
        entity: 'logo',
        shortName,
        imageFile: logoFile,
        baseNameOld: baseNameLogoOld,
        needOptimizedImages: false,
        entitySuffix,
      });
    }

    // Если posterFile существует, значит его poster изменили на клиенте. Сохранение в Облаке и в БД.
    if (posterFile) {
      // Сохраняет новые файлы, удаляет старые, которые заменили на новые в облаке.
      uploadedFileNames.poster = await uploadFileToCloudHandler({
        entity: 'poster',
        shortName,
        imageFile: posterFile,
        baseNameOld: baseNamePosterOld,
        needOptimizedImages: true,
        entitySuffix,
      });
    }

    return {
      uploadedFileNamesLogo: uploadedFileNames.logo,
      uploadedFileNamesPoster: uploadedFileNames.poster,
    };
  }
}
