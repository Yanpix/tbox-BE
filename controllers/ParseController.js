const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const path = require('path');
const Match = require('./../models/Match'); 
const MatchImport = require('./../models/MatchImport'); 

exports.parse = async function (req, res) {

    const p = path.join(
        path.dirname(__dirname),
        'uploads','soccer',req.params.filename
    );

    /*
    return new Promise((resolve, reject)=>{
        fs.createReadStream(p)
        .on('error', (err)=>{res.json({error:err.code})})
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.json(results));
            }
        });
    });
    */
    const importId = Math.floor(new Date() / 1000);
    let model = MatchImport.create({importId:importId});

    return new Promise((resolve, reject)=>{
    fs.createReadStream(p)
    .on('error', (err)=>{res.json({error:err.code})})
    .pipe(csv())
    .on('data', (data) => {
        results.push(data);
        let isdraw = (data)=>{
            if(data.FTR=="D"){
                return true;
            }
            return false;        
        }
        let ishomewin = (data)=>{
            if(data.FTR=="H"){
                return true;
            }
            return false; 
        }
        let model = Match.create({
            div: data.Div,
            homeTeam: data.HomeTeam,
            awayTeam: data.AwayTeam,
            isDraw: isdraw(data),
            isHomeWinner: ishomewin(data),
            date: data.Date,
            ftag: data.FTAG,
            fthg: data.FTHG,
            importId: importId
        })
        .catch(err => {
            console.log("TCL: err", err.message);
            
        })
    })
    .on('end', (err) => {
        if (err) {
            reject(err);
        } else {
            resolve(res.json(results));
        }
    });
});
    
    
};