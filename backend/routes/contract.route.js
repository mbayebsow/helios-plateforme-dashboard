const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contract.controller');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

// Routes pour la ressource avec scopes requis pour chaque opération CRUD
router.post(
  "/",
  requiredScopes("create:contracts"),
  contractController.createContract
);
router.get(
  "/",
  requiredScopes("read:contracts"),
  contractController.getAllContracts
);
router.get(
  "/:id",
  requiredScopes("read:contracts"),
  contractController.getContractById
);
router.put(
  "/:id",
  requiredScopes("update:contracts"),
  contractController.updateContractById
);
router.delete(
  "/:id",
  requiredScopes("delete:contracts"),
  contractController.deleteContractById
);

module.exports = router;
