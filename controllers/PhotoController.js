const fs = require('fs');
const CONFIG = JSON.parse(fs.readFileSync('config.json', 'utf8').trim());
const Photo = require('../models/Photo');


exports.getAll = async function (req, res) {
    let models = await Photo.find()
        .catch(err => console.log(err.message))
    return models ? res.json(models) : [];
};


exports.getOne = async function (req, res) {
    let model = await Photo.findById(req.params.id)
        .catch(err => console.log(err.message))
    return model ? res.json(model) : [];
};


exports.create = async function (req, res) {
    console.log("TCL: req", req.files)

    let models = [];
    if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
            req.files[i].url = CONFIG.photoUploadDir + '/' + req.files[i].filename
            let model = await Photo.create(req.files[i])
                .catch(err => {
                    console.log("TCL: err", err.message);
                    return res.status(400).json(err);
                })
            models.push(model);
        }
    }

    return models ? res.json(models) : [];
};


exports.delete = async function (req, res) {
    let model = await Photo.findOneAndDelete({
            _id: req.params.id
        })
        .catch(err => {
            console.log("TCL: err", err.message);
            return res.status(400).json(err);
        })
    return model ? res.json(model) : res.status(404).end();
};