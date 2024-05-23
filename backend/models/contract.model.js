const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema({
  add_by: {
    type: String,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  file_referer: {
    type: String,
    required: true,
  },
});

const signSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
});

const contractSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  contract_type: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  files: [filesSchema],
  sign: [signSchema],
  created_by: {
    type: String,
    required: true,
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

const Contract = mongoose.model('Contracts', contractSchema);

module.exports = Contract;
