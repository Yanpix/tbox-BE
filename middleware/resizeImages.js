const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

module.exports = async (req, res, next) => {
    for (let i = 0; i < req.files.length; i++) {
        let {
            filename: image
        } = req.files[i];
        let uploadDir = req.files[i].destination + "/resized";
        // console.log("TCL: uploadDir", uploadDir)

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, {
              recursive: true
            });
          }

        await sharp(req.files[i].path)
            .resize(280, 280)
            .jpeg({
                quality: 80
            })
            .toFile(
                path.resolve(uploadDir, image)
            )
        // fs.unlinkSync(req.files[i].path)
    }
    next();
}