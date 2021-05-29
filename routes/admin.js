var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/adminController')

router.get('/', AdminController.getAll );
router.get('/:id', AdminController.getById )
router.put('/:id/update', AdminController.updateAdmin)
router.delete('/:id/delete', AdminController.deleteadmin)

module.exports = router;

