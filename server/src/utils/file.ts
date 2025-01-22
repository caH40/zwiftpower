type ConvertMulterFileParams = {
  file: Express.Multer.File;
  newFileName?: string;
};

/**
 * Конвертирует объект Multer File в объект Web API File.
 * @param file - Файл из Multer.
 * @param newFileName - Новое имя для файла (опционально).
 */
export function convertMulterFileToWebFile({
  file,
  newFileName,
}: ConvertMulterFileParams): File {
  if (!file.buffer) {
    throw new Error('Файл не содержит данных для преобразования.');
  }

  const fileName = newFileName || file.originalname;

  return new File([file.buffer], fileName, {
    type: file.mimetype,
  });
}
