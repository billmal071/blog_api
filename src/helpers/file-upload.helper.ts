import multer from 'multer';
import path from 'path';

const limits = {
  fileSize: 3221225472,
  files: 1,
};

function checkFileType(file: Express.Multer.File, cb: any) {
  // allowed extensions
  const fileTypes = /png|gif|jiff|jpg|jpeg/;
  // check extension
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // check mime
  const mimeType = fileTypes.test(file.mimetype.split('/')[1]);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Error: Images only');
  }
}

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: limits,
  fileFilter: (_, file, cb) => {
    checkFileType(file, cb);
  },
});
