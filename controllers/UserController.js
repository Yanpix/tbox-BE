const User = require('../models/User');


exports.getAll = async function (req, res) {
    let models = await User.find()
        .catch(err => console.log(err))
    return models ? res.json(models) : [];
};


exports.getOne = async function (req, res) {
    let model = await User.findById(req.params.id)
        .catch(err => console.log(err))
    return model ? res.json(model) : [];
};


exports.create = function (req, res) {
    console.log("TCL: exports.create -> req.body", req.body)
    res.send('NOT IMPLEMENTED: User create POST');
};


exports.delete = function (req, res) {
    res.send('NOT IMPLEMENTED: User delete POST User detail: ' + req.params.id);
};


exports.update = function (req, res) {
    res.send('NOT IMPLEMENTED: User update POST User detail: ' + req.params.id);
};