const multer = require('multer');
const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 1048576, 
  },
});

const singleUpload = upload.single('file');
const multipleUpload = upload.array('files', 10);

module.exports = { singleUpload, multipleUpload };
