const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  project_id: {
    type: String,
    required: true,
  },
  invoice_id: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  gateway: {
    type: String,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Complete", "Pending"],
    required: true,
  },
  paid_on: {
    type: Date,
    required: true,
  },
  offline_method: {
    type: String,
    required: true,
  },
  added_by: {
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

const Transaction = mongoose.model("Transactions", TransactionSchema);

module.exports = Transaction;
