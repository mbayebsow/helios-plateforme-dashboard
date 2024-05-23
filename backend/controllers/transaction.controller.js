const Payment = require("../models/transactions.model");

// Opération de création d'un nouveau paiement
const createPayment = async (req, res) => {
  try {
    const {
      project_id,
      invoice_id,
      note,
      amount,
      client_id,
      gateway,
      transaction_id,
      currency,
      status,
      paid_on,
      offline_method,
      added_by,
    } = req.body;

    const newPayment = new Payment({
      project_id,
      invoice_id,
      note,
      amount,
      client_id,
      gateway,
      transaction_id,
      currency,
      status,
      paid_on,
      offline_method,
      added_by,
    });

    await newPayment.save();

    res.status(201).json({ success: true, data: newPayment });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la création du paiement.",
        error: error.message,
      });
  }
};

// Opération de lecture de tous les paiements
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();

    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la récupération des paiements.",
        error: error.message,
      });
  }
};

// Opération de lecture d'un paiement par son ID
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Paiement non trouvé." });
    }

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la récupération du paiement.",
        error: error.message,
      });
  }
};

// Opération de mise à jour d'un paiement par son ID
const updatePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_id,
      invoice_id,
      note,
      amount,
      client_id,
      gateway,
      transaction_id,
      currency,
      status,
      paid_on,
      offline_method,
      added_by,
    } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      {
        project_id,
        invoice_id,
        note,
        amount,
        client_id,
        gateway,
        transaction_id,
        currency,
        status,
        paid_on,
        offline_method,
        added_by,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedPayment) {
      return res
        .status(404)
        .json({ success: false, message: "Paiement non trouvé." });
    }

    res.status(200).json({ success: true, data: updatedPayment });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la mise à jour du paiement.",
        error: error.message,
      });
  }
};

// Opération de suppression d'un paiement par son ID
const deletePaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPayment = await Payment.findByIdAndRemove(id);

    if (!deletedPayment) {
      return res
        .status(404)
        .json({ success: false, message: "Paiement non trouvé." });
    }

    res.status(200).json({ success: true, data: deletedPayment });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la suppression du paiement.",
        error: error.message,
      });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
