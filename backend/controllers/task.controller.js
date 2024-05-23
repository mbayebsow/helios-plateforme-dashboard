const Task = require('../models/task.model');

// Opération de création d'une nouvelle tâche
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      start_date,
      deadline,
      project_id,
      priority,
      completed_on,
      recurring,
      dependent_task_id,
      is_private,
      billable,
      estimate_hours,
      estimate_minutes,
      repeat,
      repeat_complete,
      repeat_count,
      repeat_type,
      repeat_cycles,
      status,
      subtasks,
      last_updated_by,
      created_by,
    } = req.body;

    const newTask = new Task({
      title,
      description,
      start_date,
      deadline,
      project_id,
      priority,
      completed_on,
      recurring,
      dependent_task_id,
      is_private,
      billable,
      estimate_hours,
      estimate_minutes,
      repeat,
      repeat_complete,
      repeat_count,
      repeat_type,
      repeat_cycles,
      status,
      subtasks,
      last_updated_by,
      created_by,
    });

    await newTask.save();

    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la création de la tâche.",
        error: error.message,
      });
  }
};

// Opération de lecture de toutes les tâches
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la récupération des tâches.",
        error: error.message,
      });
  }
};

// Opération de lecture d'une tâche par son ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Tâche non trouvée." });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la récupération de la tâche.",
        error: error.message,
      });
  }
};

// Opération de mise à jour d'une tâche par son ID
const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      start_date,
      deadline,
      project_id,
      priority,
      completed_on,
      recurring,
      dependent_task_id,
      is_private,
      billable,
      estimate_hours,
      estimate_minutes,
      repeat,
      repeat_complete,
      repeat_count,
      repeat_type,
      repeat_cycles,
      status,
      subtasks,
      last_updated_by,
      created_by,
    } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        start_date,
        deadline,
        project_id,
        priority,
        completed_on,
        recurring,
        dependent_task_id,
        is_private,
        billable,
        estimate_hours,
        estimate_minutes,
        repeat,
        repeat_complete,
        repeat_count,
        repeat_type,
        repeat_cycles,
        status,
        subtasks,
        last_updated_by,
        created_by,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Tâche non trouvée." });
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la mise à jour de la tâche.",
        error: error.message,
      });
  }
};

// Opération de suppression d'une tâche par son ID
const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndRemove(id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: 'Tâche non trouvée.' });
    }

    res.status(200).json({ success: true, data: deletedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression de la tâche.', error: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
