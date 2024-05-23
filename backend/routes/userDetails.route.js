const express = require('express');
const router = express.Router();
const userDetailsController = require('../controllers/userDetails.controller');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

// Routes pour la ressource avec scopes requis pour chaque opération CRUD
router.post('/', requiredScopes('create:'), userDetailsController.createUserDetails);
router.get('/', requiredScopes('read:'), userDetailsController.getAllUserDetails);
router.get('/:id', requiredScopes('read:'), userDetailsController.getUserDetailsById);
router.put('/:id', requiredScopes('update:'), userDetailsController.updateUserDetailsById);
router.delete('/:id', requiredScopes('delete:'), userDetailsController.deleteUserDetailsById);

module.exports = router;
