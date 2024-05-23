const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
  },
  employee_name: {
    type: String,
    required: true,
  },
  employee_mail: {
    type: String,
    required: true,
  },
});

const projectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true,
  },
  project_summary: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
  client_id: {
    type: String,
    required: true,
  },
  team_id: {
    type: String,
    required: true,
  },
  project_admin: {
    type: String,
    required: true,
  },
  project_budget: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["in_progress", "completed", "on_hold"],
    default: "in_progress",
  },
  members: [memberSchema],
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

const Project = mongoose.model('Projects', projectSchema);

module.exports = Project;
