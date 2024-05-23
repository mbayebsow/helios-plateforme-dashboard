const Team = require('../models/team.model');

// Opération de création d'une nouvelle équipe
const createTeam = async (req, res) => {
  try {
    const { team_name } = req.body;
    
    const newTeam = new Team({
      team_name,
    });

    await newTeam.save();

    res.status(201).json({ success: true, data: newTeam });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la création de l\'équipe.', error: error.message });
  }
};

// Opération de lecture de toutes les équipes
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();

    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des équipes.', error: error.message });
  }
};

// Opération de lecture d'une équipe par son ID
const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({ success: false, message: 'Équipe non trouvée.' });
    }

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération de l\'équipe.', error: error.message });
  }
};

// Opération de mise à jour d'une équipe par son ID
const updateTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const { team_name } = req.body;

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { team_name },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ success: false, message: 'Équipe non trouvée.' });
    }

    res.status(200).json({ success: true, data: updatedTeam });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de l\'équipe.', error: error.message });
  }
};

// Opération de suppression d'une équipe par son ID
const deleteTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeam = await Team.findByIdAndRemove(id);

    if (!deletedTeam) {
      return res.status(404).json({ success: false, message: 'Équipe non trouvée.' });
    }

    res.status(200).json({ success: true, data: deletedTeam });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression de l\'équipe.', error: error.message });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
};
