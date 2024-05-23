const express = require('express');
const router = express.Router();
const estimateController = require('../controllers/estimate.controller');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

// Routes pour la ressource avec scopes requis pour chaque opération CRUD
router.post(
  "/",
  requiredScopes("create:estimates"),
  estimateController.createEstimate
);
router.get(
  "/",
  requiredScopes("read:estimates"),
  estimateController.getAllEstimates
);
router.get(
  "/:id",
  requiredScopes("read:estimates"),
  estimateController.getEstimateById
);
router.put(
  "/:id",
  requiredScopes("update:estimates"),
  estimateController.updateEstimateById
);
router.delete(
  "/:id",
  requiredScopes("delete:estimates"),
  estimateController.deleteEstimateById
);

module.exports = router;
