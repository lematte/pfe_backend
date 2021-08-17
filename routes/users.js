var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth')
const userController = require('../controllers/userController')
const uploadMulter = require('../middleware/upload')
const validation = require('../middleware/validation')

    
router.get('/',auth.requireSignIn, userController.getAll );

router.get('/:id', userController.getById)
router.put('/:id/update', userController.update)
router.put('/updatePassword/:id', userController.updatePassword)

router.delete('/:id/delete', userController.delete)
router.post('/upload/:id', uploadMulter, validation, userController.uploadImage)
router.get('/getcentreVille/:Ville', userController.getVille)

module.exports = router;
