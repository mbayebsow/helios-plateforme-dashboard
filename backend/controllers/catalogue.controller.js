const Catalogue = require('../models/catalogue.model');

// Opération de création d'un nouveau catalogue
const createCatalogue = async (req, res) => {
  try {
    const { name, price, category, description, default_image } = req.body;
    
    const newCatalogue = new Catalogue({
      name,
      price,
      category,
      description,
      default_image,
    });

    await newCatalogue.save();

    res.status(201).json({ success: true, data: newCatalogue });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la création du catalogue.', error: error.message });
  }
};

// Opération de lecture de tous les catalogues
const getAllCatalogues = async (req, res) => {
  try {
    const catalogues = await Catalogue.find();

    res.status(200).json({ success: true, data: catalogues });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des catalogues.', error: error.message });
  }
};

// Opération de lecture d'un catalogue par son ID
const getCatalogueById = async (req, res) => {
  try {
    const { id } = req.params;

    const catalogue = await Catalogue.findById(id);

    if (!catalogue) {
      return res.status(404).json({ success: false, message: 'Catalogue non trouvé.' });
    }

    res.status(200).json({ success: true, data: catalogue });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération du catalogue.', error: error.message });
  }
};

// Opération de mise à jour d'un catalogue par son ID
const updateCatalogueById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, default_image } = req.body;

    const updatedCatalogue = await Catalogue.findByIdAndUpdate(
      id,
      { name, price, category, description, default_image, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedCatalogue) {
      return res.status(404).json({ success: false, message: 'Catalogue non trouvé.' });
    }

    res.status(200).json({ success: true, data: updatedCatalogue });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du catalogue.', error: error.message });
  }
};

// Opération de suppression d'un catalogue par son ID
const deleteCatalogueById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCatalogue = await Catalogue.findByIdAndRemove(id);

    if (!deletedCatalogue) {
      return res.status(404).json({ success: false, message: 'Catalogue non trouvé.' });
    }

    res.status(200).json({ success: true, data: deletedCatalogue });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression du catalogue.', error: error.message });
  }
};

module.exports = {
  createCatalogue,
  getAllCatalogues,
  getCatalogueById,
  updateCatalogueById,
  deleteCatalogueById,
};
