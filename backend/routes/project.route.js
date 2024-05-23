const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

// Routes pour la ressource avec scopes requis pour chaque opération CRUD
router.post(
  "/",
  requiredScopes("create:projets"),
  projectController.createProject
);
router.get(
  "/",
  requiredScopes("read:projets"),
  projectController.getAllProjects
);
router.get(
  "/:id",
  requiredScopes("read:projets"),
  projectController.getProjectById
);
router.put(
  "/:id",
  requiredScopes("update:projets"),
  projectController.updateProjectById
);
router.delete(
  "/:id",
  requiredScopes("delete:projets"),
  projectController.deleteProjectById
);

module.exports = router;
