const Estimate = require('../models/estimate.model');

// Opération de création d'une nouvelle estimation
const createEstimate = async (req, res) => {
  try {
    const {
      client_id,
      estimate_number,
      valid_till,
      items,
      sub_total,
      total,
      discount,
      note,
      description,
      created_by,
    } = req.body;
    
    const newEstimate = new Estimate({
      client_id,
      estimate_number,
      valid_till,
      items,
      sub_total,
      total,
      discount,
      note,
      description,
      created_by,
    });

    await newEstimate.save();

    res.status(201).json({ success: true, data: newEstimate });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la création de l\'estimation.', error: error.message });
  }
};

// Opération de lecture de toutes les estimations
const getAllEstimates = async (req, res) => {
  try {
    const estimates = await Estimate.find();

    res.status(200).json({ success: true, data: estimates });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des estimations.', error: error.message });
  }
};

// Opération de lecture d'une estimation par son ID
const getEstimateById = async (req, res) => {
  try {
    const { id } = req.params;

    const estimate = await Estimate.findById(id);

    if (!estimate) {
      return res.status(404).json({ success: false, message: 'Estimation non trouvée.' });
    }

    res.status(200).json({ success: true, data: estimate });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération de l\'estimation.', error: error.message });
  }
};

// Opération de mise à jour d'une estimation par son ID
const updateEstimateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      client_id,
      estimate_number,
      valid_till,
      items,
      sub_total,
      total,
      discount,
      note,
      description,
      created_by,
    } = req.body;

    const updatedEstimate = await Estimate.findByIdAndUpdate(
      id,
      {
        client_id,
        estimate_number,
        valid_till,
        items,
        sub_total,
        total,
        discount,
        note,
        description,
        created_by,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedEstimate) {
      return res.status(404).json({ success: false, message: 'Estimation non trouvée.' });
    }

    res.status(200).json({ success: true, data: updatedEstimate });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de l\'estimation.', error: error.message });
  }
};

// Opération de suppression d'une estimation par son ID
const deleteEstimateById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEstimate = await Estimate.findByIdAndRemove(id);

    if (!deletedEstimate) {
      return res.status(404).json({ success: false, message: 'Estimation non trouvée.' });
    }

    res.status(200).json({ success: true, data: deletedEstimate });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression de l\'estimation.', error: error.message });
  }
};

module.exports = {
  createEstimate,
  getAllEstimates,
  getEstimateById,
  updateEstimateById,
  deleteEstimateById,
};
