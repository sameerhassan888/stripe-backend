const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admins', adminController.getAdmins);
router.delete('/admins/:id', adminController.deleteAdmin);

module.exports = router;
