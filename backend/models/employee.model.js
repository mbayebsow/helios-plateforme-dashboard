const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  address: {
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

const Employees = mongoose.model('Employees', employeesSchema);

module.exports = Employees;
