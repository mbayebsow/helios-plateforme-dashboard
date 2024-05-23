const Contract = require('../models/contract.model');

// Opération de création d'un nouveau contrat
const createContract = async (req, res) => {
  try {
    const {
      client_id,
      subject,
      description,
      amount,
      contract_type,
      start_date,
      end_date,
      files,
      sign,
      created_by,
    } = req.body;

    const newContract = new Contract({
      client_id,
      subject,
      description,
      amount,
      contract_type,
      start_date,
      end_date,
      files,
      sign,
      created_by,
    });

    await newContract.save();

    res.status(201).json({ success: true, data: newContract });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la création du contrat.",
        error: error.message,
      });
  }
};

// Opération de lecture de tous les contrats
const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();

    res.status(200).json({ success: true, data: contracts });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la récupération des contrats.",
        error: error.message,
      });
  }
};

// Opération de lecture d'un contrat par son ID
const getContractById = async (req, res) => {
  try {
    const { id } = req.params;

    const contract = await Contract.findById(id);

    if (!contract) {
      return res
        .status(404)
        .json({ success: false, message: "Contrat non trouvé." });
    }

    res.status(200).json({ success: true, data: contract });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la récupération du contrat.",
        error: error.message,
      });
  }
};

// Opération de mise à jour d'un contrat par son ID
const updateContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      client_id,
      subject,
      description,
      amount,
      contract_type,
      start_date,
      end_date,
      files,
      sign,
      created_by,
    } = req.body;

    const updatedContract = await Contract.findByIdAndUpdate(
      id,
      {
        client_id,
        subject,
        description,
        amount,
        contract_type,
        start_date,
        end_date,
        files,
        sign,
        created_by,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedContract) {
      return res
        .status(404)
        .json({ success: false, message: "Contrat non trouvé." });
    }

    res.status(200).json({ success: true, data: updatedContract });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la mise à jour du contrat.",
        error: error.message,
      });
  }
};

// Opération de suppression d'un contrat par son ID
const deleteContractById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContract = await Contract.findByIdAndRemove(id);

    if (!deletedContract) {
      return res.status(404).json({ success: false, message: 'Contrat non trouvé.' });
    }

    res.status(200).json({ success: true, data: deletedContract });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression du contrat.', error: error.message });
  }
};

module.exports = {
  createContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
};
