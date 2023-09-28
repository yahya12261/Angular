const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const storage = multer.diskStorage({
    destination: './uploads/products/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + "." + file.mimetype.split('/')[1]);
        // Extantion : console.log(file.mimetype.split('/')[1])
    }

  });

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
