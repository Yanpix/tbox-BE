const CONFIG = require('../config.json');
const User = require('../models/User');
const cryptor = require('../helpers/cryptor');


exports.getAll = async function (req, res) {
    let models = await User.find()
        .catch(err => console.log(err.message))
    return models ? res.json(models) : [];
};


exports.getOne = async function (req, res) {
    let model = await User.findById(req.params.id)
        .catch(err => console.log(err.message))
    return model ? res.json(model) : [];
};


exports.register = async function (req, res) {
    let existed = await User.findOne({
            name: req.body.name
        })
        .catch(err => {
            console.log("TCL: err", err.message);
            return res.status(400).json(err);
        });
    if (existed != null) return res.status(400).json('user is already registered');
    if (req.body.password == null) return res.status(400).json('no password');

    req.body.hashedPassword = await cryptor.encrypt(req.body.password);

    // add profiles picture url
    if (req.file && req.file.filename) {
        req.file.url = `${CONFIG.userProfilePictureUploadDir}/${req.file.filename}`;
        req.body.profile_picture = req.file;
    }

    // create User
    let model = await User.create(req.body)
        .catch(err => {
            console.log("TCL: err", err.message);
            return res.status(400).json(err);
        })
    return model ? res.json(model) : [];
};


exports.delete = async function (req, res) {
    let model = await User.findOneAndDelete({
            _id: req.params.id
        })
        .catch(err => {
            console.log("TCL: err", err.message);
            return res.status(400).json(err);
        })
    return model ? res.json(model) : res.status(404).end();
};


exports.update = async function (req, res) {
    let model = await User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            new: true,
        })
        .catch(err => {
            console.log("TCL: err", err.message);
            return res.status(400).json(err);
        });
    return model ? res.json(model) : res.status(404).end();
};