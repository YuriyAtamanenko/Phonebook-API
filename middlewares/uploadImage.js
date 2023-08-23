const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirPath = path.join(__dirname, "../tmp");

    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + uniqueSuffix + file.originalname);
  },
});

const uploadImage = multer({ storage });

module.exports = uploadImage;
