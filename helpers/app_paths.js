const path = require('path');

module.exports = {
    getUploadedImagesFolder: () => {
        return "file:///" + path.join(__dirname, '../uploads/');
    },
    getStaticImagesFolder: () => {
        return "file:///" + path.join(__dirname, '../public/images/');
    },
    getUploadedImagesUrl: () => {
        return '/';
    },
    getStaticImagesUrl: () => {
        return '/images/';
    }
}