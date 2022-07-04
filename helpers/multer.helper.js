const multer = require("multer");
const fs = require("fs");
const path = "public/images";

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   if (!fs.existsSync(path)) {
  //     fs.mkdirSync(path, { recursive: true });
  //   }
  //   cb(null, path);
  // },
  filename: function (req, file, cb) {
    // console.log(file, 'ppp');
    const uniqueSuffix = file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

module.exports = storage;

// const multer = require('multer');
// const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       if (fs.existsSync('./public/data/uploads')) {
//         cb(null, './public/data/uploads')
//       } else {
//         fs.mkdirSync('./public/data/uploads', {recursive: true})
//         cb(null, './public/data/uploads')
//     }
//   },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + file.originalname
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })

// module.exports = storage