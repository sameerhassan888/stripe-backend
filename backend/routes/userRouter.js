const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Fetch users route
router.get('/users', userController.getUsers);

// Delete user route
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
