const Project = require('../models/project.model');

// Opération de création d'un nouveau projet
const createProject = async (req, res) => {
  try {
    const {
      project_name,
      project_summary,
      start_date,
      deadline,
      notes,
      client_id,
      team_id,
      project_admin,
      project_budget,
      status,
      members,
      created_by,
    } = req.body;

    const newProject = new Project({
      project_name,
      project_summary,
      start_date,
      deadline,
      notes,
      client_id,
      team_id,
      project_admin,
      project_budget,
      status,
      members,
      created_by,
    });

    await newProject.save();

    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du projet.",
      error: error.message,
    });
  }
};

// Opération de lecture de tous les projets
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des projets.",
      error: error.message,
    });
  }
};

// Opération de lecture d'un projet par son ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Projet non trouvé." });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du projet.",
      error: error.message,
    });
  }
};

// Opération de mise à jour d'un projet par son ID
const updateProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_name,
      project_summary,
      start_date,
      deadline,
      notes,
      client_id,
      team_id,
      project_admin,
      project_budget,
      status,
      members,
    } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        project_name,
        project_summary,
        start_date,
        deadline,
        notes,
        client_id,
        team_id,
        project_admin,
        project_budget,
        status,
        members,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Projet non trouvé." });
    }

    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du projet.",
      error: error.message,
    });
  }
};

// Opération de suppression d'un projet par son ID
const deleteProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndRemove(id);

    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Projet non trouvé.' });
    }

    res.status(200).json({ success: true, data: deletedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression du projet.', error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
