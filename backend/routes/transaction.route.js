const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/transaction.controller");
const { requiredScopes } = require('express-oauth2-jwt-bearer');

// Routes pour la ressource avec scopes requis pour chaque opération CRUD
router.post(
  "/",
  requiredScopes("create:transactions"),
  paymentController.createPayment
);
router.get(
  "/",
  requiredScopes("read:transactions"),
  paymentController.getAllPayments
);
router.get(
  "/:id",
  requiredScopes("read:transactions"),
  paymentController.getPaymentById
);
router.put(
  "/:id",
  requiredScopes("update:transactions"),
  paymentController.updatePaymentById
);
router.delete(
  "/:id",
  requiredScopes("delete:transactions"),
  paymentController.deletePaymentById
);

module.exports = router;
