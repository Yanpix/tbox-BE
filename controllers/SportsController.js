const Match = require('./../models/Match');
const bodyParser = require('body-parser');

exports.getLosers = async function (req, res) {

    let team = req.body.team;
    return res.json(team);
    /*let models = await Match.find()
        .catch(err => console.log(err.message))
    return models ? res.json(models) : [];*/
};