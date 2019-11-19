const Match = require('./../models/Match');
const bodyParser = require('body-parser');

function getOpponents(team, arr){
    let opponents = [];
    for(let item of arr){
        if (item.homeTeam!=team)
            opponents.push(item.homeTeam);
        if (item.awayTeam!=team)
            opponents.push(item.awayTeam);
    }
    return opponents;
}

exports.getLosers = async function (req, res) {

    let team = req.body.team;
    let matches = await Match.find(
        {$or: [{homeTeam: team, isDraw:false, isHomeWinner:true},
        {awayTeam: team,isDraw:false,isHomeWinner:false}]},{homeTeam:1, awayTeam:1})
        .catch(err => console.log(err.message));
    let opponents = await getOpponents(team, matches);

    return matches ? res.json(Array.from(new Set(opponents))) : [];
};