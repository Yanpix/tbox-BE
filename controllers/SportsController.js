const Match = require('./../models/Match');
const bodyParser = require('body-parser');

exports.getLosers = async function (req, res) {

    let team = req.body.team;
    let matches = await Match.find({$or: [{homeTeam: "Juventus", isDraw:false, isHomeWinner:true}, {awayTeam: "Juventus",isDraw:false,isHomeWinner:false}]},{homeTeam:1, awayTeam:1})
        .catch(err => console.log(err.message));



    return res.json(matches);
    /*let models = await Match.find()
        .catch(err => console.log(err.message))
    return models ? res.json(models) : [];*/
};