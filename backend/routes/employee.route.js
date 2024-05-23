const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employee.controller');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

// Routes pour la ressource "Contracts" avec scopes requis pour chaque opération CRUD
router.post(
  "/",
  requiredScopes("create:employees"),
  employeesController.createEmployee
);
router.get(
  "/",
  requiredScopes("read:employees"),
  employeesController.getAllEmployees
);
router.get(
  "/:id",
  requiredScopes("read:employees"),
  employeesController.getEmployeeById
);
router.put(
  "/:id",
  requiredScopes("update:employees"),
  employeesController.updateEmployeeById
);
router.delete(
  "/:id",
  requiredScopes("delete:employees"),
  employeesController.deleteEmployeeById
);

module.exports = router;