const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
  },
  item_summary: {
    type: String,
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

const invoiceSchema = new mongoose.Schema({
  project_id: {
    type: String,
  },
  service_id: {
    type: String,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  client_id: {
    type: String,
    required: true,
  },
  invoice_number: {
    type: String,
    required: true,
    unique: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  due_amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["paid", "unpaid", "overdue"],
    default: "unpaid",
  },
  estimate_id: {
    type: String,
  },
  items: [itemSchema],
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

const Invoice = mongoose.model("Invoices", invoiceSchema);

module.exports = Invoice;

