const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  team_name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Team = mongoose.model('Teams', teamSchema);

module.exports = Team;
