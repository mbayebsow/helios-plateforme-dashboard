const Invoice = require("../models/invoice.model");

// Opération de création d'une nouvelle facture (Invoice)
const createInvoice = async (req, res) => {
  try {
    const {
      project_id,
      service_id,
      discount,
      client_id,
      invoice_number,
      due_date,
      due_amount,
      status,
      estimate_id,
      items,
      created_by,
    } = req.body;

    const newInvoice = new Invoice({
      project_id,
      service_id,
      discount,
      client_id,
      invoice_number,
      due_date,
      due_amount,
      status,
      estimate_id,
      items,
      created_by,
    });

    await newInvoice.save();

    res.status(201).json({ success: true, data: newInvoice });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la création de la facture.",
        error: error.message,
      });
  }
};

// Opération de lecture de toutes les factures (Invoices)
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();

    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la récupération des factures.",
        error: error.message,
      });
  }
};

// Opération de lecture d'une facture par son ID
const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Facture non trouvée." });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la récupération de la facture.",
        error: error.message,
      });
  }
};

// Opération de mise à jour d'une facture par son ID
const updateInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_id,
      service_id,
      discount,
      client_id,
      invoice_number,
      due_date,
      due_amount,
      status,
      estimate_id,
      items,
      created_by,
    } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      {
        project_id,
        service_id,
        discount,
        client_id,
        invoice_number,
        due_date,
        due_amount,
        status,
        estimate_id,
        items,
        created_by,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedInvoice) {
      return res
        .status(404)
        .json({ success: false, message: "Facture non trouvée." });
    }

    res.status(200).json({ success: true, data: updatedInvoice });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la mise à jour de la facture.",
        error: error.message,
      });
  }
};

// Opération de suppression d'une facture par son ID
const deleteInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInvoice = await Invoice.findByIdAndRemove(id);

    if (!deletedInvoice) {
      return res
        .status(404)
        .json({ success: false, message: "Facture non trouvée." });
    }

    res.status(200).json({ success: true, data: deletedInvoice });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la suppression de la facture.",
        error: error.message,
      });
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoiceById,
  deleteInvoiceById,
};
