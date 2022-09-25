// const Datauri=require('datauri');
// const path=require('path');
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const dUri = new Datauri();
// const dataUri = (req) => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
// const upload = multer({ storage: storage });

// module.exports ={ upload:upload, dataUri:dataUri };
// /* diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/img");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + " " + file.originalname);
//     },
//   }); */
const multer = require("multer");
const path = require("path");
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});
