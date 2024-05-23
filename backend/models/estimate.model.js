const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
  },
  item_summary: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit_price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const estimateSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: true,
  },
  estimate_number: {
    type: String,
    required: true,
  },
  valid_till: {
    type: Date,
    required: true,
  },
  items: [itemSchema],
  sub_total: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  note: {
    type: String,
  },
  description: {
    type: String,
  },
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

const Estimate = mongoose.model('Estimates', estimateSchema);

module.exports = Estimate;
