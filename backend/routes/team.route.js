const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

// Routes pour la ressource avec scopes requis pour chaque opération CRUD
router.post('/', requiredScopes('create:'), teamController.createTeam);
router.get('/', requiredScopes('read:'), teamController.getAllTeams);
router.get('/:id', requiredScopes('read:'), teamController.getTeamById);
router.put('/:id', requiredScopes('update:'), teamController.updateTeamById);
router.delete('/:id', requiredScopes('delete:'), teamController.deleteTeamById);

module.exports = router;
