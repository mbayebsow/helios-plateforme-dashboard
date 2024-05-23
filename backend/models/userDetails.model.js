const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  group: {
    type: String,
    enum: ["Client", "User"],
    default: "User",
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;

