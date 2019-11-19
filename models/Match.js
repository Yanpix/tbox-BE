const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    div: {
      type: String,
      required: true
    },   
    homeTeam: {
      type: String,
      required: true
    },   
    awayTeam: {
      type: String,
      required: true
    },
    isDraw:{
      type: Boolean,
      required: true
    },
    isHomeWinner:{
      type: Boolean,
      required: true
    },   
    date: {
      type: String,
      required: true,
      max: 10
    },
    fthg: {
        type: String,
        required: true,
        max: 2
      },
    ftag: {
        type: String,
        required: true,
        max: 2
    },
    importId: {
      type: Number,
      required: true
    }
    }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });

module.exports = mongoose.model('Match', MatchSchema);