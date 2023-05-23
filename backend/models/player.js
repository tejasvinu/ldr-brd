const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  winLossRatio: {
    type: Number,
  },
  noOfMatches: {
    type: Number,
  },
  elo: {
    type: Number,
  },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
