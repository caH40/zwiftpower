import slugify from 'slugify';

import { Cloud } from './cloud.js';
import { parseAndGroupFileNames } from '../utils/parseAndGroupFileNames.js';
import { handleAndLogError } from '../errors/error.js';
import { convertMulterFileToWebFile } from '../utils/file.js';
import { fileTypes } from '../assets/files.js';
import { convertToWebP } from '../utils/image-resize.js';
import { generateFileName } from '../utils/file-name.js';
import { imageSizeMappingOnlyWidth } from '../assets/image-sizes.js';

// types
import { entityForFileSuffix, TSaveFileToCloud } from '../types/types.interface.js';
import { TAvailableSizes, TFileMetadataForCloud } from '../types/model.interface.js';

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
    // Название для части суффикса файла в объектном хранилище в Облаке.
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
  public delete = async (baseNames: (string | undefined)[]): Promise<void> => {
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
  public async imageStorageHandler({
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
    entitySuffix: entityForFileSuffix; // Суффикс для название (используется тип сущности: team, organizer,series...)
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
      uploadedFileNames.logo = await this.uploadFileToCloudHandler({
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
      uploadedFileNames.poster = await this.uploadFileToCloudHandler({
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

  async uploadFileToCloudHandler({
    entity,
    shortName,
    imageFile,
    baseNameOld,
    needOptimizedImages,
    entitySuffix,
  }: {
    entity: 'poster' | 'logo';
    shortName: string;
    imageFile: Express.Multer.File;
    baseNameOld?: string;
    needOptimizedImages: boolean;
    entitySuffix: entityForFileSuffix;
  }): Promise<string[]> {
    // Экземпляр класса Облака.
    const cloud = new Cloud({ cloudName: 'vk', maxSizeFileInMBytes: 5 });

    const suffixImage = `${entitySuffix}-${shortName}-${entity}-`;

    const uploadedFileNames = await this.saveFileToCloud({
      file: convertMulterFileToWebFile({ file: imageFile }),
      type: 'image',
      suffix: suffixImage,
      needOptimizedImages,
    });

    // Удаление замещенных (старых) файлов изображений из облака.
    baseNameOld &&
      (await cloud
        .deleteFiles({
          prefix: baseNameOld,
        })
        .catch((e) => handleAndLogError(e)));

    return uploadedFileNames;
  }

  /**
   * Сохраняет файл изображения и оптимизированные файлы изображений в облаке с уникальным суффиксом и возвращает массив имен сохраненных файлов.
   */
  async saveFileToCloud({
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
      const tasks = (Object.keys(imageSizeMappingOnlyWidth) as TAvailableSizes[]).map(
        (sizeKey) => saveFile(file, sizeKey)
      );
      await Promise.all(tasks);
    } else {
      await saveFile(file);
    }

    return fileNames;
  }
}
