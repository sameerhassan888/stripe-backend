const express = require('express');
const router = express.Router();
const authController = require('../controllers/adminauth');

router.post('/adminregister', authController.register);
router.post('/adminlogin', authController.login);

module.exports = router;
