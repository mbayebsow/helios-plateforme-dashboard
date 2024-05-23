const express = require('express');
const router = express.Router();
const catalogueController = require('../controllers/catalogue.controller');
const { requiredScopes } = require('express-oauth2-jwt-bearer');


// Routes pour la ressource "Catalogues" avec scopes requis pour chaque opération CRUD
router.post(
  "/",
  requiredScopes("create:catalogs"),
  catalogueController.createCatalogue
);
router.get(
  "/",
  requiredScopes("read:catalogs"),
  catalogueController.getAllCatalogues
);
router.get(
  "/:id",
  requiredScopes("read:catalogs"),
  catalogueController.getCatalogueById
);
router.put(
  "/:id",
  requiredScopes("update:catalogs"),
  catalogueController.updateCatalogueById
);
router.delete(
  "/:id",
  requiredScopes("delete:catalogs"),
  catalogueController.deleteCatalogueById
);

module.exports = router;
