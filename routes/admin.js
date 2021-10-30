var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/adminController')

router.get('/', AdminController.getAll );
router.get('/:id', AdminController.getById )
router.get('/getByIdUser/:id', AdminController.getByIdUser);
router.put('/update/:id', AdminController.updateAdmin)
router.delete('/delete/:id', AdminController.deleteadmin)

module.exports = router;

