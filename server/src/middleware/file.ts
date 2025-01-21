import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

// Настройки хранилища для файлов
const storage = multer.memoryStorage();

// Конфигурация загрузки
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Максимальный размер файла: 10MB
  fileFilter: (req, file, cb) => {
    // Допустимые MIME-типы
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type.'));
    }
  },
});

/**
 * Универсальный middleware для обработки файлов.
 * Использовать в маршрутах с указанием полей, принимающих файлы.
 *
 * @param fields - Массив объектов с описанием принимаемых файлов.
 */
export const fileMiddleware = (fields: { name: string; maxCount?: number }[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const handler = upload.fields(fields);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler(req, res, (err: any) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        next();
      }
    });
  };
};
