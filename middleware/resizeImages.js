const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

module.exports = async (req, res, next) => {
    for (let i = 0; i < req.files.length; i++) {
        let {
            filename: image
        } = req.files[i];
        // console.log("TCL: image", image)

        await sharp(req.files[i].path)
            .resize(280, 280)
            .jpeg({
                quality: 80
            })
            .toFile(
                path.resolve(req.files[i].destination, 'resized', image)
            )
        // fs.unlinkSync(req.files[i].path)
    }
    next();
}