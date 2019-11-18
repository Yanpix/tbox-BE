const multer = require('multer');
const sharp = require('sharp');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
  // resizeImage: function(file) {

  // }

  // filename: function (req, file, cb) {
  //   var ext = require('path').extname(file.originalname);
  //   ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
  //   require('crypto').pseudoRandomBytes(16, function (err, raw) {
  //     cb(null, (err ? undefined : raw.toString('hex') ) + ext);
  //   });
  // }

});
const upload = multer({ storage: storage });

module.exports = upload;