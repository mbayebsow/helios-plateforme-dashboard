const UserDetails = require('../models/userDetails.model');

// Opération de création d'un nouveau UserDetails
const createUserDetails = async (req, res) => {
  try {
    const { user_id, company_name, address, state, website, group } = req.body;
    
    const newUserDetails = new UserDetails({
      user_id,
      company_name,
      address,
      state,
      website,
      group,
    });

    await newUserDetails.save();

    res.status(201).json({ success: true, data: newUserDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la création des détails d\'utilisateur.', error: error.message });
  }
};

// Opération de lecture de tous les UserDetails
const getAllUserDetails = async (req, res) => {
  try {
    const userDetails = await UserDetails.find();

    res.status(200).json({ success: true, data: userDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des détails d\'utilisateur.', error: error.message });
  }
};

// Opération de lecture d'un UserDetails par son ID
const getUserDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    const userDetails = await UserDetails.findById(id);

    if (!userDetails) {
      return res.status(404).json({ success: false, message: 'Détails d\'utilisateur non trouvés.' });
    }

    res.status(200).json({ success: true, data: userDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des détails d\'utilisateur.', error: error.message });
  }
};

// Opération de mise à jour d'un UserDetails par son ID
const updateUserDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, company_name, address, state, website, group } = req.body;

    const updatedUserDetails = await UserDetails.findByIdAndUpdate(
      id,
      { user_id, company_name, address, state, website, group, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedUserDetails) {
      return res.status(404).json({ success: false, message: 'Détails d\'utilisateur non trouvés.' });
    }

    res.status(200).json({ success: true, data: updatedUserDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour des détails d\'utilisateur.', error: error.message });
  }
};

// Opération de suppression d'un UserDetails par son ID
const deleteUserDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUserDetails = await UserDetails.findByIdAndRemove(id);

    if (!deletedUserDetails) {
      return res.status(404).json({ success: false, message: 'Détails d\'utilisateur non trouvés.' });
    }

    res.status(200).json({ success: true, data: deletedUserDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression des détails d\'utilisateur.', error: error.message });
  }
};

module.exports = {
  createUserDetails,
  getAllUserDetails,
  getUserDetailsById,
  updateUserDetailsById,
  deleteUserDetailsById,
};
