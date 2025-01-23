import { uploadFileToCloudHandler } from './upload-handler.js';

/**
 * Обработчик файлов изображений logo и poster Организатора.
 * Сохранение в облаке, возвращение массивы имен файлов, сохраненных в облаке для logo, poster.
 */
export async function imageStorageHandler({
  shortName,
  baseNameLogoOld,
  baseNamePosterOld,
  logoFile,
  posterFile,
}: {
  shortName: string; // Короткое название Организатора в нижнем регистре.
  baseNameLogoOld?: string; // Базовое название файла изображениям в облаке.
  baseNamePosterOld?: string; // Базовое название файла изображениям в облаке.
  logoFile?: Express.Multer.File;
  posterFile?: Express.Multer.File;
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
    });
  }

  return {
    uploadedFileNamesLogo: uploadedFileNames.logo,
    uploadedFileNamesPoster: uploadedFileNames.poster,
  };
}
