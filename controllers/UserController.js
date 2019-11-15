const User = require('../models/User');


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


exports.register = function (req, res) {
    console.log("TCL: exports.create -> req.body", req.body)
    res.send('NOT IMPLEMENTED: User create POST');
};


exports.create = async function (req, res) {
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