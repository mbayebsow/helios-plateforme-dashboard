const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice.controller');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

// Routes pour la ressource avec scopes requis pour chaque opération CRUD
router.post(
  "/",
  requiredScopes("create:invoices"),
  invoiceController.createInvoice
);
router.get(
  "/",
  requiredScopes("read:invoices"),
  invoiceController.getAllInvoices
);
router.get(
  "/:id",
  requiredScopes("read:invoices"),
  invoiceController.getInvoiceById
);
router.put(
  "/:id",
  requiredScopes("update:invoices"),
  invoiceController.updateInvoiceById
);
router.delete(
  "/:id",
  requiredScopes("delete:invoices"),
  invoiceController.deleteInvoiceById
);

module.exports = router;
