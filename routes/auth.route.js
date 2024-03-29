var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')
//var auth = require('../middleware/auth')
router.post('/register', authController.signup)
router.post('/login', authController.signin)
router.post('/signout', authController.signout)
router.post('/sendOTP', authController.sendOTP)
router.post('/verifyOTP', authController.verifyOTP)

module.exports = router;
