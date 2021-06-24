var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth')
const userController = require('../controllers/userController')
    
router.get('/',auth.requireSignIn, userController.getAll );
router.get('/:id', userController.getById)
router.put('/:id/update', userController.update)
router.delete('/:id/delete', userController.delete)

module.exports = router;
