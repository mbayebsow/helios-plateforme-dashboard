const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
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
  assigned_to: {
    type: String,
    required: true,
  },
  completed_on: {
    type: Date,
    default: null,
  },
  is_completed: {
    type: Boolean,
    default: false,
  },
  last_updated_by: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
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
  project_id: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "Hight"],
    default: "Medium",
    required: true,
  },
  completed_on: {
    type: Date,
  },
  recurring: {
    type: Boolean,
    default: false,
  },
  dependent_task_id: {
    type: String,
  },
  is_private: {
    type: Boolean,
    default: false,
  },
  billable: {
    type: Boolean,
    default: false,
  },
  estimate_hours: {
    type: Number,
    default: 0,
  },
  estimate_minutes: {
    type: Number,
    default: 0,
  },
  repeat: {
    type: Boolean,
    default: false,
  },
  repeat_complete: {
    type: Boolean,
    default: false,
  },
  repeat_count: {
    type: Number,
    default: 0,
  },
  repeat_type: {
    type: String,
    enum: ["Jours", "Semaines", "Mois", "Annees"],
    default: "Jours",
    required: true,
  },
  repeat_cycles: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["incomplete", "en cour", "Complete", "Abandonner"],
    default: "incomplete",
    required: true,
  },
  subtasks: [subtaskSchema],
  last_updated_by: {
    type: String,
    required: true,
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

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
