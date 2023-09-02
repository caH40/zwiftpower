import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'build/images/news/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toLocaleDateString() + '-' + file.originalname);
  },
});

const approvedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/pjpeg'];

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (approvedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    // cb('unapproved image file type');
  }
};

export const uploadFile = multer({ storage, fileFilter });
