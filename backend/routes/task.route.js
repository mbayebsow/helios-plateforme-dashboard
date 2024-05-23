const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

// Routes pour la ressource avec scopes requis pour chaque opération CRUD
router.post(
  "/",
  requiredScopes("create:tasks"),
  taskController.createTask
);
router.get(
  "/",
  requiredScopes("read:tasks"),
  taskController.getAllTasks
);
router.get(
  "/:id",
  requiredScopes("read:tasks"),
  taskController.getTaskById
);
router.put(
  "/:id",
  requiredScopes("update:tasks"),
  taskController.updateTaskById
);
router.delete(
  "/:id",
  requiredScopes("delete:tasks"),
  taskController.deleteTaskById
);

module.exports = router;
